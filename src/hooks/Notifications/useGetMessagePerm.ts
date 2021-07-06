import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/rootReducer';
import {checkMessagePermission} from '../../utils/Permissions/Permission';
import messaging from '@react-native-firebase/messaging';
import {saveTokenToDatabase} from '../../utils/User/Methods/saveTokenToDatabase';

const useGetMessagePerm = () => {
  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  useEffect(() => {
    if (firebaseUser.uid) {
      messaging()
        .getToken()
        .then((token) => {
          saveTokenToDatabase(token, firebaseUser.uid);
        })
        .catch((err) => console.log('Error in saving tokens ', err));

      return messaging().onTokenRefresh((token) => {
        saveTokenToDatabase(token, firebaseUser.uid);
      });
    }
  }, [firebaseUser.uid]);
};

export default useGetMessagePerm;
