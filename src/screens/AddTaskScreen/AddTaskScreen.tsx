import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {RALEWAY_BOLD, RALEWAY_MEDIUM} from '../../constants/Fonts/Fonts';
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
import BackHeader from '../../components/Headers/BackHeader/BackHeader';
import {RootState} from '../../store/rootReducer';
import useOnAddTask from '../../hooks/Task/useOnAddTask';
import ModalActivityIndicator from '../../components/Modals/ModalActivityIndicator/ModalActivityIndicator';
import {addTaskSchema} from '../../utils/validators/task';
import {NameIcon} from '../../components/Icons/Icons';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AddTaskScreen = (props: any) => {
  const edit = props.route.params && props.route.params.edit;
  const existingTask = props.route.params && props.route.params.existingTask;

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
    onChangeColor,
    backgroundColors,
    onChangeStatus,
    openDatePicker,
    mode,
    onCancel,
  } = useOnAddTask(
    firebaseUser,
    appTheme['color-primary-default'],
    props.navigation,
    edit,
    existingTask,
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
          {edit ? 'Edit' : 'Add'}
          <Text
            category="h2"
            style={[
              styles.heading,
              {color: appTheme['color-primary-default']},
            ]}>
            {' '}
            Task
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
          validationSchema={addTaskSchema}
          validateOnBlur>
          {(formikProps) => (
            <View style={styles.formContainer}>
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM}}
                style={styles.nameInput}
                status="basic"
                placeholder={edit ? existingTask.title : 'Title'}
                onBlur={() => formikProps.setFieldTouched('title')}
                keyboardType="default"
                accessoryLeft={NameIcon}
                value={formikProps.values.title}
                onChangeText={formikProps.handleChange('title')}
                size="large"
                caption={
                  formikProps.errors.title && formikProps.touched.title
                    ? formikProps.errors.title
                    : ''
                }
              />
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM, minHeight: 70}}
                style={styles.descriptionInput}
                status="basic"
                placeholder={
                  edit ? existingTask.description : 'Descriptional (optional)'
                }
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
              <View style={styles.statusView}>
                <Button
                  appearance={task.status === 'ToDo' ? 'filled' : 'outline'}
                  status="danger"
                  onPress={() => onChangeStatus('ToDo')}
                  style={styles.statusBtn}>
                  To-Do
                </Button>
                <Button
                  appearance={task.status === 'OnGoing' ? 'filled' : 'outline'}
                  status="info"
                  onPress={() => onChangeStatus('OnGoing')}
                  style={styles.statusBtn}>
                  On-going
                </Button>
                <Button
                  appearance={
                    task.status === 'Completed' ? 'filled' : 'outline'
                  }
                  onPress={() => onChangeStatus('Completed')}
                  status="success"
                  style={styles.statusBtn}>
                  Completed
                </Button>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <FlatList
                  horizontal={true}
                  keyExtractor={(c) => c}
                  data={backgroundColors}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        key={item}
                        style={[styles.colorSelect, {backgroundColor: item}]}
                        onPress={() => onChangeColor(item)}
                      />
                    );
                  }}
                  ItemSeparatorComponent={() => <View style={{width: 15}} />}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
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
                {edit ? 'Edit Task' : 'Add Task'}
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

export default AddTaskScreen;
