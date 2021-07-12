import {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {FAIL} from '../../constants/RemoteStates/remotestates';
import {defaultUser, UserInterface} from '../../models/User/User';
import {
  setFirebaseUser,
  updateFirebaseUserStatus,
} from '../../store/User/actionCreator/addFirebaseUser';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {generalErrorN} from '../../components/Alerts/GeneralError';
import {
  CameraOptions,
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import {uploadToStorage} from '../../utils/Storage/uploadToStorage';
import {writeAsync} from '../../utils/Firestore/write';
import {showLogOutNotifi} from '../../utils/User/Methods/showWelcomeNotifi';
import {checkReadingMediaPermission} from '../../utils/Permissions/Permission';

const useGetUserForProfile = (uid: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserInterface>();
  const [settingOpen, toggleSetting] = useState<boolean>(false);
  const [goingToMessage, setGoingToMessage] = useState<boolean>(false);
  const [selectImage, toggleSelectImage] = useState<boolean>(false);

  useEffect(() => {
    try {
      const subscriber = firestore()
        .collection('users')
        .doc(uid)
        .onSnapshot((doc) => {
          if (doc) {
            doc.exists && setUser(doc.data() as UserInterface);
          }
        });
      setLoading(false);

      return () => subscriber();
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
  }, [uid]);

  const storeDispatch = useDispatch();

  const signOut = async () => {
    try {
      //signout the firebase user
      await auth().signOut();

      //send signout notification
      await showLogOutNotifi(user?.tokens, user?.name);

      //update the user status to fail
      storeDispatch(setFirebaseUser(defaultUser, FAIL));
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

  const onCloseSelectImage = () => {
    toggleSelectImage(!selectImage);
  };

  //When the user is capturing image from the camera
  const onCaptureImage = async () => {
    onCloseSelectImage();

    //check for reading storeage permissions
    await checkReadingMediaPermission();
    const options: CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };

    //launch camera
    launchCamera(options, async (response) => {
      if (response.errorMessage || response.errorCode) {
        Toast.show({
          type: 'error',
          text1: 'Try Again!!',
          text2: 'Something went wrong',
          position: 'top',
        });
      } else if (response.assets) {
        await onSetGroupImage(response.assets[0].uri);
      }
    });
  };

  //When the user is selecting image from the library
  const onSelectFromLibrary = async () => {
    onCloseSelectImage();
    await checkReadingMediaPermission();
    const options: ImageLibraryOptions = {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, async (response) => {
      if (response.errorCode || response.errorMessage) {
        Toast.show({
          type: 'error',
          text1: 'Try Again!!',
          text2: 'Something went wrong',
          position: 'top',
        });
      } else if (response.assets) {
        await onSetGroupImage(response.assets[0].uri);
      }
    });
  };

  const onSetGroupImage = async (uri?: string) => {
    try {
      setLoading(true);
      if (uri) {
        //upload the file to firebase storage and get the download URL
        const downloadUrl = await uploadToStorage(
          `images/users/${uid}/${uri.substring(uri.lastIndexOf('/') + 1)}`,
          uri,
        );
        if (downloadUrl) {
          //Update the photo
          await writeAsync('users', uid, {photoURL: downloadUrl}, true);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error in setting a groupImage', error);
      Toast.show({
        type: 'error',
        text1: 'Try Again!!',
        text2: 'Something went wrong',
        position: 'top',
      });
    }
  };

  return {
    loading,
    user,
    onSignOut,
    settingOpen,
    onClickSettings,
    goingToMessage,
    setGoingToMessage,
    selectImage,
    onCloseSelectImage,
    onCaptureImage,
    onSelectFromLibrary,
  };
};

export default useGetUserForProfile;
