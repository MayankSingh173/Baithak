import firestore from '@react-native-firebase/firestore';

export const saveTokenToDatabase = async (token: string, uid: string) => {
  try {
    if (uid) {
      await firestore()
        .collection('users')
        .doc(uid)
        .update({tokens: firestore.FieldValue.arrayUnion(token)});
    }
  } catch (err) {
    console.log('Error in upating token ', err);
  }
};
