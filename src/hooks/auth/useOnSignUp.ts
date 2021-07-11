import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {OK_TEXT, TITLE} from '../../constants/Alerts/GeneralError';
import {generalError} from '../../components/Alerts/GeneralError';
import {SignUpForm} from '../../models/Auth/interface';

const useOnSignUp = () => {
  //Initial state
  const initialFormState: SignUpForm = {
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
    toggleModal(true);
    try {
      //API for signup
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
