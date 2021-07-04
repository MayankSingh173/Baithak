import {VideoStreamParams} from '../../../models/Meeting/CreateMeeting/interface';
import {UserInterface} from '../../../models/User/User';
import firestore from '@react-native-firebase/firestore';

//On Member join meet wee need to update our member list of baithak in db
export const onMemberJoinMeet = async (
  meetConfig: VideoStreamParams,
  firebaseUser: UserInterface,
) => {
  try {
    await firestore()
      .collection('Baithak')
      .doc(`${meetConfig.meetId}${meetConfig.password}`)
      .update({
        members: firestore.FieldValue.arrayUnion({
          uid: firebaseUser.uid,
          name: firebaseUser.name,
          agoraId: meetConfig.agoraId,
          imageUrl: firebaseUser.photoURL,
          unread: 0,
        }),
      });
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
