import {updateAsync} from '../../Firestore/update';
import {writeAsync} from '../../Firestore/write';
import firestore from '@react-native-firebase/firestore';

export const changeGroupActivity = async (uid: string, groupId?: string) => {
  try {
    //if groupId then make the user active
    if (groupId) await writeAsync('users', uid, {activeOnGroup: groupId}, true);
    else {
      //Remove the activity
      await updateAsync('users', uid, {
        activeOnGroup: firestore.FieldValue.delete(),
      });
    }
  } catch (error) {
    console.log('Error in making active on group', error);
  }
};
