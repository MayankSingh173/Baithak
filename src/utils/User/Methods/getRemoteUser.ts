import firestore from '@react-native-firebase/firestore';
import {UserInterface} from '../../../models/User/User';

export const getRemoteUser = async (uid: string) => {
  try {
    let data: UserInterface | undefined;
    firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          data = snapshot.data() as UserInterface;
        }
      });

    if (data) {
      return data;
    }
  } catch (error) {
    console.log('Error if fetching remote user', error);
  }
};
