import firestore from '@react-native-firebase/firestore';
import {UserInterface} from '../../../models/User/User';

export const getRemoteUser = async (uid: string) => {
  try {
    const userRef = await firestore().collection('users').doc(uid).get();

    if (userRef.exists) {
      return userRef.data() as UserInterface;
    }
  } catch (error) {
    console.log('Error if fetching remote user', error);
  }
};

export const getRemoteUserByAgoraId = (uid: number) => {
  try {
    let data: UserInterface | undefined;
    firestore()
      .collection('users')
      .where('agoraId', '==', uid)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length !== 0) {
          data =
            snapshot.docs[0].exists &&
            (snapshot.docs[0].data() as UserInterface);
        }
      });

    return data;
  } catch (error) {
    console.log('Error if fetching remote user by agora Id', error);
  }
};
