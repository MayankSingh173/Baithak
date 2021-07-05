import {useState} from 'react';
import {DEFAULT_GROUP_IMAGE} from '../../../constants/Images/Images';
import {UserInterface} from '../../../models/User/User';
import {
  CameraOptions,
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {uploadToStorage} from '../../../utils/Storage/uploadToStorage';
import {onCreateGroup} from '../../../utils/Messages/Group/onCreateGroup';
import {groupForm} from '../../../models/Messages/interface';
import {GROUP_CHAT_SCREEN} from '../../../constants/Navigation/Navigation';

const useOnCreateGroup = (
  selectedUsers: UserInterface[],
  firebaseUser: UserInterface,
  navigation: any,
) => {
  const [initialFormState, setInitialFormState] = useState<groupForm>({
    groupName: '',
    description: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>(DEFAULT_GROUP_IMAGE);
  const [selectImage, toggleSelectImage] = useState<boolean>(false);

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
        downloadUrl && setImageURL(downloadUrl);
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

  const handleSubmit = async (groupDetails: groupForm) => {
    try {
      setLoading(true);
      //Create a New Group
      const newGroup = await onCreateGroup(
        groupDetails.groupName,
        selectedUsers,
        groupDetails.description,
        imageURL,
      );

      //Move to chat Screen
      if (newGroup) navigation.navigate(GROUP_CHAT_SCREEN, {group: newGroup});
      else {
        Toast.show({
          type: 'error',
          text1: 'Try Again!!',
          text2: 'Something went wrong',
          position: 'top',
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error in create group handleSubmit', error);
      Toast.show({
        type: 'error',
        text1: 'Try Again!!',
        text2: 'Something went wrong',
        position: 'top',
      });
    }
  };

  return {
    initialFormState,
    handleSubmit,
    loading,
    imageURL,
    onCaptureImage,
    onSelectFromLibrary,
    selectImage,
    onCloseSelectImage,
  };
};

export default useOnCreateGroup;
