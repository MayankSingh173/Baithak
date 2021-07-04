import {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {FAIL} from '../../constants/RemoteStates/remotestates';
import {defaultUser, UserInterface} from '../../models/User/User';
import {updateFirebaseUserStatus} from '../../store/User/actionCreator/addFirebaseUser';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {generalErrorN} from '../../components/Alerts/GeneralError';
import {readAsync} from '../../utils/Firestore/read';
import {createDM} from '../../utils/Messages/Group/onCreateGroup';
import {GROUP_CHAT_SCREEN} from '../../constants/Navigation/Navigation';

const useGetUserForProfile = (uid: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserInterface>(defaultUser);
  const [settingOpen, toggleSetting] = useState<boolean>(false);
  const [goingToMessage, setGoingToMessage] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const localUser = await readAsync('users', uid);
        localUser && setUser(localUser as UserInterface);
        setLoading(false);
      } catch (error) {
        console.log('Eror in profile fecthing', error);
        setLoading(false);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Something went wrong 😔',
          text2: 'Please try again!!',
        });
      }
    };

    fetchUser();
  }, [uid]);

  const storeDispatch = useDispatch();

  const signOut = async () => {
    try {
      await auth().signOut();
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Great Success✌',
        text2: 'You have successfully logout ',
      });
      storeDispatch(updateFirebaseUserStatus(FAIL));
    } catch (err) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Something went wrong 😔',
        text2: 'Please try again!!',
      });
      storeDispatch(updateFirebaseUserStatus(FAIL));
      console.log('Error in log out', err);
    }
  };

  const onSignOut = async () => {
    generalErrorN(
      {
        title: 'Log Out',
        textMessage: 'Are you sure you want to logout',
        okText: 'Yes',
      },
      [
        {
          text: 'No',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: signOut,
        },
      ],
    );
  };

  const onClickSettings = () => {
    toggleSetting(!settingOpen);
  };

  return {
    loading,
    user,
    onSignOut,
    settingOpen,
    onClickSettings,
    goingToMessage,
    setGoingToMessage,
  };
};

export default useGetUserForProfile;
