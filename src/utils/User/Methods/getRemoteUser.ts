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

export const getRemoteUserByAgoraId = async (uid: number) => {
  try {
    let data: UserInterface | undefined;
    const userRef = await firestore()
      .collection('users')
      .where('agoraId', '==', uid)
      .get();

    //Will contain only one doc if uid is correct
    for (const doc of userRef.docs) {
      if (doc.exists) data = doc.data() as UserInterface;
    }
    return data;
  } catch (error) {
    console.log('Error if fetching remote user by agora Id', error);
  }
};
