import {VideoStreamParams} from '../../../models/Meeting/CreateMeeting/interface';
import {UserInterface} from '../../../models/User/User';
import firestore from '@react-native-firebase/firestore';
import {writeAsync} from '../../Firestore/write';
import {Group} from '../../../models/Messages/interface';

//On Member join meet wee need to update our member list of baithak in db
export const onMemberJoinMeet = async (
  meetConfig: VideoStreamParams,
  firebaseUser: UserInterface,
) => {
  try {
    await writeAsync(
      'Baithak',
      `${meetConfig.meetId}${meetConfig.password}`,
      {
        members: firestore.FieldValue.arrayUnion({
          uid: firebaseUser.uid,
          name: firebaseUser.name,
          agoraId: meetConfig.agoraId,
          imageUrl: firebaseUser.photoURL,
          unread: 0,
          audio: true,
          video: true,
        }),
      },
      true,
    );

    //Check if the new member joined is present in the group or not. If not then add him into the group
    const present = await alreadyPresentInGroup(
      firebaseUser.uid,
      meetConfig.groupId
        ? meetConfig.groupId
        : `${meetConfig.meetId}${meetConfig.password}`,
    );

    if (!present) {
      await writeAsync(
        'groups',
        `${meetConfig.meetId}${meetConfig.password}`,
        {
          membersDetails: firestore.FieldValue.arrayUnion({
            uid: firebaseUser.uid,
            name: firebaseUser.name,
            agoraId: meetConfig.agoraId,
            imageUrl: firebaseUser.photoURL,
            unread: 0,
          }),
          membersID: firestore.FieldValue.arrayUnion(firebaseUser.uid),
        },
        true,
      );
    }
  } catch (err) {
    console.log('Error in adding a member', err);
  }
};

//On Member left meet we need to update our member list of baithak in db
export const onMemberLeftMeet = async (
  meetConfig: VideoStreamParams,
  firebaseUser: UserInterface,
) => {
  try {
    await firestore()
      .collection('Baithak')
      .doc(`${meetConfig.meetId}${meetConfig.password}`)
      .update({
        members: firestore.FieldValue.arrayRemove({
          uid: firebaseUser.uid,
          name: firebaseUser.name,
          agoraId: meetConfig.agoraId,
          imageUrl: firebaseUser.photoURL,
        }),
      });
  } catch (err) {
    console.log('Error in remove the member', err);
  }
};

//This function is check wether the new member is already present in the group or not
export const alreadyPresentInGroup = async (uid: string, groupId: string) => {
  try {
    let present: boolean = false;
    const group = await firestore().collection('groups').doc(groupId).get();
    if (group.exists) {
      const groupData = group.data() as Group;
      for (const mUid of groupData.membersID) {
        if (mUid === uid) {
          present = true;
          break;
        }
      }
    }

    return present;
  } catch (error) {
    console.log('Error in checking already present in a group', error);
  }
};
