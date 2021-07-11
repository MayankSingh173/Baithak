import {Group} from '../../../models/Messages/interface';
import {UserInterface} from '../../../models/User/User';
import firestore from '@react-native-firebase/firestore';

//this methoda check is the there already DM exist with user who you wants to chat
export const checkDMExist = async (
  otherMember: UserInterface,
  firbaseUser: UserInterface,
) => {
  try {
    const groupRef = await firestore()
      .collection('groups')
      .where('isDM', '==', true)
      .where('membersID', 'array-contains', firbaseUser.uid)
      .get();

    if (groupRef.docs.length > 0) {
      for (const docs of groupRef.docs) {
        if (docs.exists) {
          const data = docs.data() as Group;
          if (data.membersID.find((uid) => uid === otherMember.uid)) {
            return {
              exist: true,
              group: data,
            };
          }
        }
      }
    }

    return {exist: false};
  } catch (error) {
    console.log('Error in checking DM Exists', error);
  }
};
