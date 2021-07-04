import {updateAsync} from '../../Firestore/update';
import {writeAsync} from '../../Firestore/write';
import firestore from '@react-native-firebase/firestore';

export const changeGroupActivity = async (uid: string, groupId?: string) => {
  try {
    if (groupId) await writeAsync('users', uid, {activeOnGroup: groupId}, true);
    else {
      await updateAsync('users', uid, {
        activeOnGroup: firestore.FieldValue.delete(),
      });
    }
  } catch (error) {
    console.log('Error in making active on group', error);
  }
};
