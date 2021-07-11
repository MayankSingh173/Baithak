import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import {generalError} from '../../components/Alerts/GeneralError';
import {ForgoPassForm} from '../../models/Auth/interface';

interface props {
  navigation: any;
}
const useForgotPassword = (props: props) => {
  const initialFormState: ForgoPassForm = {
    email: '',
  };

  const [isLoading, toggleModal] = useState<boolean>(false);

  const onPasswordReset = async (props: any) => {
    toggleModal(true);
    try {
      //sending password reset mail
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
