import firestore from '@react-native-firebase/firestore';
import {writeAsync} from '../../Firestore/write';

export const removeActivityFromUser = async (uid: string) => {
  try {
    if (uid !== '') {
      await writeAsync(
        'users',
        uid,
        {activeOnGroup: firestore.FieldValue.delete()},
        true,
      );
    }
  } catch (error) {
    console.log('Error in remove all activity', error);
  }
};
