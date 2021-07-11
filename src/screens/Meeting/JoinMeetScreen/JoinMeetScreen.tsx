import React from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
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
  Icon,
} from '@ui-kitten/components';
import {Formik} from 'formik';
import {NameIcon, PasswordIcon} from '../../../components/Icons/Icons';
import {joinMeetingSchema} from '../../../utils/validators/meeting';
import useJoinMeet from '../../../hooks/Meeting/useJoinMeet';
import ModalActivityIndicator from '../../../components/Modals/ModalActivityIndicator/ModalActivityIndicator';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';

const JoinMeetScreen = (props: any) => {
  const appTheme = useTheme();
  const styles = useStyleSheet(themedStyles);

  //This params will be coming when the user to trying to join baithak from the Task card
  const existingMeetId = props.route.params.meetId;
  const existingPassword = props.route.params.password;

  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const {
    initialFormState,
    passwordVisible,
    onPasswordIconPress,
    handleSubmit,
    isLoading,
  } = useJoinMeet(
    props.navigation,
    firebaseUser.agoraId,
    existingMeetId,
    existingPassword,
  );

  const EyeIcon = (props: any) => (
    <TouchableOpacity onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye' : 'eye-off'} />
    </TouchableOpacity>
  );

  return (
    <Layout level="1" style={styles.main}>
      <ModalActivityIndicator modalVisible={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackHeader
          leftIconColor={theme === 'dark' ? 'white' : 'black'}
          leftIcon="arrow-back-outline"
          onLeftPress={() => props.navigation.goBack()}
        />
        <Text category="h3" style={styles.heading}>
          Join
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
        <Formik
          initialValues={initialFormState}
          onSubmit={handleSubmit}
          validationSchema={joinMeetingSchema}
          validateOnBlur>
          {(formikProps) => (
            <View style={styles.formContainer}>
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM}}
                style={styles.nameInput}
                status="basic"
                placeholder="Baithak ID"
                onBlur={() => formikProps.setFieldTouched('meetId')}
                keyboardType="phone-pad"
                accessoryLeft={NameIcon}
                value={formikProps.values.meetId}
                onChangeText={formikProps.handleChange('meetId')}
                size="large"
                caption={
                  formikProps.errors.meetId && formikProps.touched.meetId
                    ? formikProps.errors.meetId
                    : ''
                }
              />
              <Input
                textStyle={{fontFamily: RALEWAY_MEDIUM}}
                style={styles.passwordInput}
                status="basic"
                size="large"
                placeholder="Password"
                onBlur={() => formikProps.setFieldTouched('password')}
                accessoryRight={EyeIcon}
                value={formikProps.values.password}
                caption={
                  formikProps.errors.password && formikProps.touched.password
                    ? formikProps.errors.password
                    : ''
                }
                accessoryLeft={PasswordIcon}
                secureTextEntry={!passwordVisible}
                onChangeText={formikProps.handleChange('password')}
              />
              <Button
                style={styles.createButton}
                size="large"
                onPress={formikProps.handleSubmit}>
                Join Baithak
              </Button>
              <View
                style={{
                  marginTop: '95%',
                }}>
                <Text style={styles.worry}>
                  Head on{' '}
                  <Text
                    category="h6"
                    style={[
                      styles.security,
                      {color: appTheme['color-primary-default']},
                    ]}>
                    Baithak
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.tagLine,
                    {color: appTheme['color-basic-500']},
                  ]}>
                  Your're friends are waiting for you!!
                </Text>
              </View>
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
  tagLine: {
    fontFamily: RALEWAY_REGULAR,
    alignSelf: 'center',
  },
  security: {
    fontFamily: RALEWAY_EXTRA_BOLD,
  },
});

export default JoinMeetScreen;
