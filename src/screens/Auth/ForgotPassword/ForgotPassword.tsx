import React, {FC} from 'react';
import {View, ScrollView} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Text,
  Layout,
  Button,
  Input,
} from '@ui-kitten/components';
import {
  RALEWAY_EXTRA_BOLD,
  RALEWAY_MEDIUM,
  RALEWAY_REGULAR,
} from '../../../constants/Fonts/Fonts';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';
import {Formik} from 'formik';
import {passwordResetSchema} from '../../../utils/validators/auth';
import ModalActivityIndicator from '../../../components/Modals/ModalActivityIndicator/ModalActivityIndicator';
import {EmailIcon} from '../../../components/Icons/Icons';
import {SIGN_IN_SCREEN} from '../../../constants/Navigation/Navigation';
import useForgotPassword from '../../../hooks/auth/useForgotPassword';

interface props {
  navigation: any;
}

const ForgotPassword: FC<props> = ({navigation}) => {
  //custom hook for forgot password logic
  const {isLoading, onPasswordReset, initialFormState} =
    useForgotPassword(navigation);

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout level={theme === 'dark' ? '4' : '1'} style={styles.main}>
      <ModalActivityIndicator modalVisible={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.semiCircle} />
        <View style={styles.container}>
          <Text style={styles.heading} category="h3">
            Hey,
          </Text>
          <Text style={styles.heading} category="h3">
            Forgot Password ?
          </Text>
          <Text style={styles.createAccount}>
            No Worries /
            <Text style={{fontFamily: RALEWAY_MEDIUM}}> Create New</Text>
          </Text>
          <Formik
            initialValues={initialFormState}
            validationSchema={passwordResetSchema}
            validateOnBlur
            onSubmit={onPasswordReset}>
            {(formikProps) => (
              <View style={styles.formContainer}>
                <Input
                  textStyle={{fontFamily: RALEWAY_MEDIUM}}
                  style={styles.emailInput}
                  status="basic"
                  placeholder="Email"
                  onBlur={() => formikProps.setFieldTouched('email')}
                  keyboardType="email-address"
                  caption={
                    formikProps.errors.email && formikProps.touched.email
                      ? formikProps.errors.email
                      : ''
                  }
                  accessoryLeft={EmailIcon}
                  value={formikProps.values.email}
                  onChangeText={formikProps.handleChange('email')}
                  size="large"
                />
                <Text
                  style={[
                    styles.createAccount,
                    {marginTop: 20, alignSelf: 'center'},
                  ]}
                  onPress={() => navigation.navigate(SIGN_IN_SCREEN)}>
                  Want to Login ? /
                  <Text style={{fontFamily: RALEWAY_MEDIUM}}> Sign In</Text>
                </Text>
                <Button
                  style={styles.resetButton}
                  size="large"
                  onPress={formikProps.handleSubmit}>
                  Get Reset link
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  main: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontFamily: RALEWAY_EXTRA_BOLD,
  },
  semiCircle: {
    height: 50,
    width: 25,
    backgroundColor: 'color-primary-default',
    marginVertical: 30,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  container: {
    flex: 1,
    paddingTop: 30,
  },
  createAccount: {
    color: 'grey',
    fontFamily: RALEWAY_REGULAR,
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    paddingTop: 30,
  },
  emailInput: {
    borderRadius: 10,
  },
  passwordInput: {
    borderRadius: 10,
    marginTop: 20,
  },
  resetButton: {
    marginTop: 20,
    borderRadius: 10,
  },
});

export default ForgotPassword;
