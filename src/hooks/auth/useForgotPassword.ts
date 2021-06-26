import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import {generalError} from '../../components/Alerts/GeneralError';

interface props {
  navigation: any;
}
const useForgotPassword = (props: props) => {
  const initialFormState = {
    email: '',
  };

  const [isLoading, toggleModal] = useState<boolean>(false);

  const onPasswordReset = async (props: any) => {
    toggleModal(true);
    try {
      await auth().sendPasswordResetEmail(props.email);
      generalError(
        () => {
          toggleModal(false);
          props.navigation.goBack();
        },
        {
          title: 'Link sent',
          textMessage:
            'We have sent a password reset link to the email provided',
          okText: 'Sign In',
        },
      );
    } catch (error) {
      generalError(
        () => {
          toggleModal(false);
        },
        {
          title: 'Something went wrong',
          textMessage: `Looks like your account is not valid anymore. Sign up again`,
          okText: 'Ok',
        },
      );
    }
  };

  return {
    onPasswordReset,
    initialFormState,
    isLoading,
  };
};

export default useForgotPassword;
