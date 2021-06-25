import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Text,
  Layout,
  Button,
  Input,
  Icon,
} from '@ui-kitten/components';
import {
  RALEWAY_EXTRA_BOLD,
  RALEWAY_MEDIUM,
  RALEWAY_REGULAR,
} from '../../../constants/Fonts/Fonts';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';
import {Formik} from 'formik';
import {generalError} from '../../../components/Alerts/GeneralError';
import {OK_TEXT, TITLE} from '../../../constants/Alerts/GeneralError';
import auth from '@react-native-firebase/auth';
import {signInSchema} from '../../../utils/validators/auth';
import ModalActivityIndicator from '../../../components/Modals/ModalActivityIndicator/ModalActivityIndicator';
import {EmailIcon, PasswordIcon} from '../../../components/Icons/Icons';
import {
  FORGOT_PASSWORD,
  SIGN_UP_SCREEN,
} from '../../../constants/Navigation/Navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import LogoButton from '../../../components/Buttons/LogoButton/LogoButton';
import Divider from '../../../components/Divider/Divider';
import {getErrorMessage} from '../../../utils/Errors/Auth/googleSignIn';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

interface props {
  navigation: any;
}

//Configure google signIn

GoogleSignin.configure({
  webClientId:
    '674208648605-ulil75i3oidb59cemelerrqvffd6m5mp.apps.googleusercontent.com',
});

const initialFormState = {
  email: '',
  password: '',
};

const SignIn = (props: props) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isLoading, toggleModal] = useState<boolean>(false);

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );
  const styles = useStyleSheet(themedStyles);

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSignInButtonPress = (props: any) => {
    console.log('signUp');
    toggleModal(true);
    auth()
      .signInWithEmailAndPassword(props.email, props.password)
      .then((response: any) => {})
      .catch((error) => {
        generalError(() => toggleModal(false), {
          title: TITLE,
          textMessage: error.message,
          okText: OK_TEXT,
        });
      });
  };

  const onGoogleAuth = async () => {
    toggleModal(true);
    try {
      // google sign in
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      generalError(() => toggleModal(false), {
        title: 'Authentication failed',
        textMessage: getErrorMessage(error),
        okText: OK_TEXT,
      });
    }
  };

  const onFacebookAuth = async () => {
    toggleModal(true);
    try {
      //facebook login
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      // Create a Firebase credential with the AccessToken
      if (data) {
        const facebookCredential = auth.FacebookAuthProvider.credential(
          data.accessToken,
        );
        // Sign-in the user with the credential
        await auth().signInWithCredential(facebookCredential);
      }
    } catch (error) {
      generalError(() => toggleModal(false), {
        title: 'Authentication failed',
        textMessage: getErrorMessage(error),
        okText: OK_TEXT,
      });
    }
  };

  const EyeIcon = (props: any) => (
    <TouchableOpacity onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye' : 'eye-off'} />
    </TouchableOpacity>
  );

  return (
    <Layout level={theme === 'dark' ? '4' : '1'} style={styles.main}>
      <ModalActivityIndicator modalVisible={isLoading} />
      <View style={styles.semiCircle} />
      <View style={styles.container}>
        <Text style={styles.heading} category="h3">
          Hey,
        </Text>
        <Text style={styles.heading} category="h3">
          Login Now,
        </Text>
        <Text
          style={styles.createAccount}
          onPress={() => props.navigation.navigate(SIGN_UP_SCREEN)}>
          If you are new /
          <Text style={{fontFamily: RALEWAY_MEDIUM}}> Create New</Text>
        </Text>
        <Formik
          initialValues={initialFormState}
          validationSchema={signInSchema}
          validateOnBlur
          onSubmit={onSignInButtonPress}>
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
              <Text
                style={[
                  styles.createAccount,
                  {marginTop: 20, alignSelf: 'center'},
                ]}
                onPress={() => props.navigation.navigate(FORGOT_PASSWORD)}>
                Forgot Password ? /
                <Text style={{fontFamily: RALEWAY_MEDIUM}}> Reset</Text>
              </Text>
              <Button
                style={styles.signInButton}
                size="large"
                onPress={formikProps.handleSubmit}>
                Sign In
              </Button>
              <Divider centerText="Or" />
              <LogoButton
                onPress={onGoogleAuth}
                buttonType="google"
                title="Sign in with Google"
                style={styles.buttonHolder}
                src={require('../../../assets/Logos/googleButton.png')}
              />
              <LogoButton
                onPress={onFacebookAuth}
                buttonType="facebook"
                title="Sign in with Facebook"
                style={styles.buttonHolder}
                src={require('../../../assets/Logos/facebookButton.png')}
              />
            </View>
          )}
        </Formik>
      </View>
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
  signInButton: {
    marginTop: 20,
    borderRadius: 10,
  },
  buttonHolder: {
    marginTop: 16,
  },
});

export default SignIn;