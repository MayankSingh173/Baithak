import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {OK_TEXT, TITLE} from '../../constants/Alerts/GeneralError';
import {generalError} from '../../components/Alerts/GeneralError';

const useOnSignUp = () => {
  const initialFormState = {
    email: '',
    password: '',
    passwordRepeat: '',
  };
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isLoading, toggleModal] = useState<boolean>(false);

  const onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSignUp = async (props: any) => {
    console.log('Signup');
    toggleModal(true);
    try {
      await auth().createUserWithEmailAndPassword(props.email, props.password);
    } catch (error) {
      generalError(() => toggleModal(false), {
        title: TITLE,
        textMessage: error.message,
        okText: OK_TEXT,
      });
    }
  };

  return {
    initialFormState,
    isLoading,
    passwordVisible,
    onPasswordIconPress,
    onSignUp,
  };
};

export default useOnSignUp;
