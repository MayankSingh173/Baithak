import storage from '@react-native-firebase/storage';
import Toast from 'react-native-toast-message';

export const uploadToStorage = async (path: string, imageUrl: string) => {
  try {
    await storage().ref(path).putFile(imageUrl);
    return await storage().ref(path).getDownloadURL();
  } catch (error) {
    console.log('Error in uploading image to firebase storage', error);
    Toast.show({
      type: 'error',
      text1: 'Something went wrong🤔',
      text2: 'Please try Again!!',
      position: 'top',
    });
  }
};
