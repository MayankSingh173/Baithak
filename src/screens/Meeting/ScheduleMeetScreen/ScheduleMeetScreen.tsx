import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import {RALEWAY_BOLD, RALEWAY_MEDIUM} from '../../../constants/Fonts/Fonts';
import {
  useTheme,
  useStyleSheet,
  Layout,
  Text,
  Input,
  Button,
  Icon,
} from '@ui-kitten/components';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import BackHeader from '../../../components/Headers/BackHeader/BackHeader';
import {RootState} from '../../../store/rootReducer';
import {scheduleMeetingSchema} from '../../../utils/validators/meeting';
import {NameIcon} from '../../../components/Icons/Icons';
import ModalActivityIndicator from '../../../components/Modals/ModalActivityIndicator/ModalActivityIndicator';
import useOnScheduleMeet from '../../../hooks/Meeting/useOnScheduleMeet';
import AddParticipants from '../../../components/UI/AddParticipants/AddParticipants';

//On schedule meet
//  1 .need to create a Baithak doc on host info
//  2. Create a groupObject
//  3. Create a task;

const ScheduleMeetScreen = (props: any) => {
  const appTheme = useTheme();

  const styles = useStyleSheet(themedStyles);

  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const {
    initialFormState,
    handleSubmit,
    isLoading,
    task,
    onChangeEvent,
    onPressIcon,
    openDatePicker,
    mode,
    onCancel,
    onPressAdd,
    selectedMembers,
    onRemoveMember,
  } = useOnScheduleMeet(
    firebaseUser,
    appTheme['color-primary-default'],
    props.navigation,
  );

  const CalendarIcon = (props: any, type: 'Date' | 'StartTime' | 'EndTime') => (
    <TouchableOpacity onPress={() => onPressIcon(type)}>
      <Icon {...props} name="calendar-outline" />
    </TouchableOpacity>
  );

  return (
    <Layout level="1" style={styles.main}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ModalActivityIndicator modalVisible={isLoading} />
        <BackHeader
          leftIconColor={theme === 'dark' ? 'white' : 'black'}
          leftIcon="arrow-back-outline"
          onLeftPress={() => props.navigation.goBack()}
        />
        <Text category="h3" style={styles.heading}>
          Schedule
          <Text
            category="h2"
            style={[
              styles.heading,
              {color: appTheme['color-primary-default']},
            ]}>
            {' '}
            Baithak
          </Text>
        </Text>
        <DateTimePickerModal
          isVisible={openDatePicker}
          mode={mode === 'Date' ? 'date' : 'time'}
          onConfirm={(date: Date) => {
            onChangeEvent(date, mode);
          }}
          onCancel={onCancel}
        />
        <Formik
          initialValues={initialFormState}
          onSubmit={handleSubmit}
          validationSchema={scheduleMeetingSchema}
          validateOnBlur>
          {(formikProps) => (
            <View style={styles.formContainer}>
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM}}
                style={styles.nameInput}
                status="basic"
                placeholder="Baithak Name"
                onBlur={() => formikProps.setFieldTouched('name')}
                keyboardType="default"
                accessoryLeft={NameIcon}
                value={formikProps.values.name}
                onChangeText={formikProps.handleChange('name')}
                size="large"
                caption={
                  formikProps.errors.name && formikProps.touched.name
                    ? formikProps.errors.name
                    : ''
                }
              />
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM, minHeight: 70}}
                style={styles.descriptionInput}
                status="basic"
                placeholder={'Descriptional (optional)'}
                onBlur={() => formikProps.setFieldTouched('description')}
                value={formikProps.values.description}
                onChangeText={formikProps.handleChange('description')}
                size="large"
                multiline={true}
              />
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM}}
                style={styles.passwordInput}
                status="basic"
                size="large"
                disabled={true}
                placeholder="Date"
                label="Choose Date"
                accessoryRight={(prop) => CalendarIcon(prop, 'Date')}
                value={moment(task.date).format('MMMM Do YYYY')}
              />
              <View style={styles.timeView}>
                <Input
                  textStyle={{fontFamily: RALEWAY_MEDIUM}}
                  style={styles.passwordInput}
                  status="basic"
                  size="large"
                  disabled={true}
                  placeholder="Start Time"
                  label="Start Time"
                  accessoryRight={(prop) => CalendarIcon(prop, 'StartTime')}
                  value={moment(task.startTime).format('LT')}
                />
                <Input
                  textStyle={{fontFamily: RALEWAY_MEDIUM}}
                  style={styles.passwordInput}
                  status="basic"
                  size="large"
                  disabled={true}
                  placeholder="End Time"
                  label="End Time"
                  accessoryRight={(prop) => CalendarIcon(prop, 'EndTime')}
                  value={moment(task.endTime).format('LT')}
                />
              </View>
              <AddParticipants
                onPressAdd={onPressAdd}
                selectedMembers={selectedMembers}
                onRemoveMember={onRemoveMember}
              />
              <Button
                style={[
                  styles.createButton,
                  {
                    backgroundColor: task.color,
                    borderColor: theme === 'dark' ? 'black' : 'white',
                  },
                ]}
                size="large"
                onPress={formikProps.handleSubmit}>
                Schedule Baithak
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Layout>
  );
};

const themedStyles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontFamily: RALEWAY_BOLD,
    marginTop: 20,
    marginLeft: 10,
  },
  formContainer: {
    flex: 1,
    paddingTop: 30,
  },
  nameInput: {
    borderRadius: 10,
  },
  createButton: {
    marginTop: 20,
    borderRadius: 10,
  },
  passwordInput: {
    borderRadius: 10,
    marginTop: 20,
  },
  descriptionInput: {
    borderRadius: 10,
    marginTop: 20,
  },
  worry: {
    fontFamily: RALEWAY_BOLD,
    alignSelf: 'center',
    marginBottom: 5,
  },
  timeView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorSelect: {
    height: 30,
    width: 30,
    borderRadius: 30,
  },
  statusBtn: {borderRadius: 20},
  statusView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ScheduleMeetScreen;
