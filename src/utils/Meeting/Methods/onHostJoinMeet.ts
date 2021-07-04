import {
  Baithak,
  VideoStreamParams,
} from '../../../models/Meeting/CreateMeeting/interface';
import {UserInterface} from '../../../models/User/User';
import firestore from '@react-native-firebase/firestore';

//On host joining the meet we are create a doc of baithak in db
export const onHostJoinMeet = async (
  meetConfig: VideoStreamParams,
  firebaseUser: UserInterface,
) => {
  //Create a document in meet collection
  try {
    const baithak = createBaithak(meetConfig, firebaseUser);
    if (baithak) {
      await firestore()
        .collection('Baithak')
        .doc(`${meetConfig.meetId}${meetConfig.password}`)
        .set(baithak);
    }
  } catch (err) {
    console.log('Error in creating Baithak at onHostJoinMeet', err);
  }
};

//This will create a object of a Baithak
export const createBaithak = (
  meetConfig: VideoStreamParams,
  firebaseUser: UserInterface,
): Baithak => {
  return {
    channelName: meetConfig.channelName,
    meetId: meetConfig.meetId,
    password: meetConfig.password,
    createAt: +new Date(),
    host: {
      agoraId: meetConfig.agoraId,
      uid: firebaseUser.uid,
    },
    members: [
      {
        uid: firebaseUser.uid,
        name: firebaseUser.name,
        agoraId: meetConfig.agoraId,
        imageUrl: firebaseUser.photoURL,
        unread: 0,
      },
    ],
  };
};
