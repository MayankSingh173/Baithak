import React from 'react';
import {StyleSheet, View} from 'react-native';
import BackHeader from '../../../components/Headers/BackHeader/BackHeader';
import {
  RALEWAY_BOLD,
  RALEWAY_EXTRA_BOLD,
  RALEWAY_MEDIUM,
  RALEWAY_REGULAR,
} from '../../../constants/Fonts/Fonts';
import {
  useTheme,
  useStyleSheet,
  Layout,
  Text,
  Input,
  Button,
} from '@ui-kitten/components';
import {Formik} from 'formik';
import {DescriptionIcon, NameIcon} from '../../../components/Icons/Icons';
import {createMeetingSchema} from '../../../utils/validators/meeting';
import useOnCreateMeet from '../../../hooks/Meeting/useOnCreateMeet';
import ModalActivityIndicator from '../../../components/Modals/ModalActivityIndicator/ModalActivityIndicator';

const CreateMeetScreen = (props: any) => {
  const appTheme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const {initialFormState, handleSubmit, isLoading} = useOnCreateMeet(
    props.navigation,
  );

  return (
    <Layout level="1" style={styles.main}>
      <ModalActivityIndicator modalVisible={isLoading} />
      <BackHeader
        leftIcon="arrow-back-outline"
        onLeftPress={() => props.navigation.goBack()}
      />
      <Text category="h3" style={styles.heading}>
        Create a
        <Text
          category="h2"
          style={[styles.heading, {color: appTheme['color-primary-default']}]}>
          {' '}
          Baithak
        </Text>
      </Text>
      <Formik
        initialValues={initialFormState}
        onSubmit={handleSubmit}
        validationSchema={createMeetingSchema}
        validateOnBlur>
        {(formikProps) => (
          <View style={styles.formContainer}>
            <Input
              textStyle={{fontFamily: RALEWAY_MEDIUM}}
              style={styles.nameInput}
              status="basic"
              placeholder="Baithak Name"
              onBlur={() => formikProps.setFieldTouched('name')}
              keyboardType="email-address"
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
              placeholder="Description (optional)"
              onBlur={() => formikProps.setFieldTouched('description')}
              accessoryLeft={DescriptionIcon}
              value={formikProps.values.description}
              onChangeText={formikProps.handleChange('description')}
              size="large"
              multiline={true}
            />
            <Button
              style={styles.createButton}
              size="large"
              onPress={formikProps.handleSubmit}>
              Create Baithak
            </Button>
            <View
              style={{
                marginTop: '80%',
              }}>
              <Text style={styles.worry}>
                Worry about{' '}
                <Text
                  category="h6"
                  style={[
                    styles.security,
                    {color: appTheme['color-primary-default']},
                  ]}>
                  Security
                </Text>{' '}
                ?
              </Text>
              <Text
                style={[styles.tagLine, {color: appTheme['color-basic-500']}]}>
                ID and Password will be auto-generated
              </Text>
            </View>
          </View>
        )}
      </Formik>
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
  tagLine: {
    fontFamily: RALEWAY_REGULAR,
    alignSelf: 'center',
  },
  security: {
    fontFamily: RALEWAY_EXTRA_BOLD,
  },
});

export default CreateMeetScreen;
