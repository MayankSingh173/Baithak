import {useSelector, useDispatch} from 'react-redux';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {RootState} from '../../store/rootReducer';
import {useState, useEffect, useCallback} from 'react';
import {
  updateFirebaseUserStatus,
  setFirebaseUser,
} from '../../store/User/actionCreator/addFirebaseUser';
import {FAIL, SUCCESS} from '../../constants/RemoteStates/remotestates';
import {Platform, ToastAndroid} from 'react-native';
import {defaultUser, UserInterface} from '../../models/User/User';
import {addNewUserObj} from '../../utils/User/Methods/addNewUserObj';
import {updateUserObjOnAuth} from '../../utils/User/Methods/updateUserObjOnAuth';
import useFirestore from '../Firestore/useFirestore';
import Toast from 'react-native-toast-message';
import {updateTheme} from '../../store/theme/actionCreator/updateTheme';
import {getRemoteTheme, getTheme} from '../../utils/User/Methods/getTheme';
import {DEFAULT_AVATAR} from '../../constants/Images/Images';

const useAuth = () => {
  const [firebaseUserRef, setFirebaseUserRef] = useState<
    FirebaseFirestoreTypes.DocumentReference | undefined
  >();

  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const userStatus = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.userStatus,
  );

  const storeDispatch = useDispatch();

  useEffect(() => {
    // get auth state
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          if (
            //If new user
            user.metadata.creationTime &&
            new Date().getTime() -
              new Date(user.metadata.creationTime).getTime() <=
              10000
          ) {
            //Add new user to firestore
            await addNewUserObj(
              user.uid,
              Platform.OS,
              getTheme(),
              user.email ? user.email : 'example@gmail.com',
              user.displayName ? user.displayName : 'Robot',
              user.photoURL ? user.photoURL : DEFAULT_AVATAR,
              false,
            );
            Toast.show({
              type: 'success',
              text1: 'Great Success👍',
              text2: 'You have successfully login into the app',
              position: 'top',
            });
          } else {
            //Update the User
            await updateUserObjOnAuth(
              user.uid,
              Platform.OS,
              user.displayName ? user.displayName : 'Robot',
              user.phoneNumber ? user.phoneNumber : undefined,
              user.email ? user.email : 'example@gmail.com',
              user.photoURL ? user.photoURL : DEFAULT_AVATAR,
            );
          }

          //update the firebase user with success status 'SUCCESS' in redux
          storeDispatch(updateFirebaseUserStatus(SUCCESS));

          // set remote user ref
          setFirebaseUserRef(firestore().collection('users').doc(user.uid));
        } else {
          //update the firebase user with success status 'FAIL' in redux
          storeDispatch(updateFirebaseUserStatus(FAIL));
          storeDispatch(updateTheme(defaultUser.theme));

          // remove listener
          setFirebaseUserRef(undefined);
        }
      } catch (error) {
        console.log('error useAuth', error);
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [storeDispatch]);

  //This is callback for update firebase user
  const userFetchCallback = useCallback(
    (fetchedUser: UserInterface) => {
      if (fetchedUser) {
        const action = setFirebaseUser(fetchedUser, SUCCESS);
        const themeAction = updateTheme(fetchedUser.theme);
        if (themeAction) {
          storeDispatch(themeAction);
        }
        storeDispatch(action);
      }
    },
    [storeDispatch],
  );

  useFirestore(firebaseUserRef, {}, 'document', userFetchCallback);

  return {
    status: userStatus,
    firebaseUser: firebaseUser,
  };
};

export default useAuth;
