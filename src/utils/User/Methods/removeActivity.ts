import firestore from '@react-native-firebase/firestore';
import {UserInterface} from '../../../models/User/User';
import {writeAsync} from '../../Firestore/write';

//This method will remove and update the activeOnGroup field
export const removeActivityFromUser = async (firebaseUser: UserInterface) => {
  try {
    if (firebaseUser.activeOnGroup) {
      await writeAsync(
        'users',
        firebaseUser.uid,
        {activeOnGroup: firestore.FieldValue.delete()},
        true,
      );
    }
  } catch (error) {
    console.log('Error in remove all activity', error);
  }
};
