import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {generalError} from '../../components/Alerts/GeneralError';
import {OK_TEXT, TITLE} from '../../constants/Alerts/GeneralError';
import {getErrorMessage} from '../../utils/Errors/Auth/googleSignIn';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useState} from 'react';

//Configure google signin
GoogleSignin.configure({
  webClientId:
    '674208648605-ulil75i3oidb59cemelerrqvffd6m5mp.apps.googleusercontent.com',
});

const useOnLogin = () => {
  const initialFormState = {
    email: '',
    password: '',
  };
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isLoading, toggleModal] = useState<boolean>(false);

  const onPasswordIconPress = () => {
    setPasswordVisible(passwordVisible);
  };

  //Sign in with email and password
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

  //signIn with google
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

  //sign In with facebook
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
      toggleModal(false);
    } catch (error) {
      generalError(() => toggleModal(false), {
        title: 'Authentication failed',
        textMessage: getErrorMessage(error),
        okText: OK_TEXT,
      });
    }
  };

  return {
    onGoogleAuth,
    onFacebookAuth,
    onSignInButtonPress,
    onPasswordIconPress,
    passwordVisible,
    isLoading,
    initialFormState,
  };
};

export default useOnLogin;
