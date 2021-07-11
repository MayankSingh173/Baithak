import {Group} from '../../../models/Messages/interface';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {CHAT_HOME_SCREEN} from '../../../constants/Navigation/Navigation';
import {generalErrorN} from '../../../components/Alerts/GeneralError';
import {
  CameraOptions,
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {uploadToStorage} from '../../../utils/Storage/uploadToStorage';
import {writeAsync} from '../../../utils/Firestore/write';
import {DEFAULT_GROUP_IMAGE} from '../../../constants/Images/Images';

const useGroupInfo = (group: Group, uid: string, navigation: any) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectImage, toggleSelectImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(
    group.groupImage ? group.groupImage : DEFAULT_GROUP_IMAGE,
  );

  const onLeaveGroup = async () => {
    try {
      setLoading(true);

      const newMemberID = group.membersID.filter((m) => m !== uid);

      await firestore()
        .collection('groups')
        .doc(group.groupId)
        .update({membersID: newMemberID});

      navigation.navigate(CHAT_HOME_SCREEN);
    } catch (error) {
      setLoading(false);
      console.log('Error in leaving the group', error);
    }
  };

  const confirmEnd = () => {
    generalErrorN(
      {
        title: 'Leave group',
        textMessage: 'Are you sure you want to leave the group?',
        okText: 'Yes',
      },
      [
        {
          text: 'No',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: onLeaveGroup,
        },
      ],
    );
  };

  const onCaptureImage = () => {
    onCloseSelectImage();
    const options: CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };

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

  const onSelectFromLibrary = () => {
    onCloseSelectImage();
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
        const downloadUrl = await uploadToStorage(
          `images/groups/${uri.substring(uri.lastIndexOf('/') + 1)}`,
          uri,
        );
        if (downloadUrl) {
          setImageUrl(downloadUrl);
          await writeAsync(
            'groups',
            group.groupId,
            {groupImage: downloadUrl},
            true,
          );
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

  const onCloseSelectImage = () => {
    toggleSelectImage(!selectImage);
  };

  return {
    isLoading,
    setLoading,
    confirmEnd,
    onSelectFromLibrary,
    onCaptureImage,
    selectImage,
    onCloseSelectImage,
    imageUrl,
  };
};

export default useGroupInfo;
