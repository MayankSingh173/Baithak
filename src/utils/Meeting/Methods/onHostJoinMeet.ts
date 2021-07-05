import {
  Baithak,
  VideoStreamParams,
} from '../../../models/Meeting/CreateMeeting/interface';
import {UserInterface} from '../../../models/User/User';
import {Group} from '../../../models/Messages/interface';
import {writeAsync} from '../../Firestore/write';
import {DEFAULT_GROUP_MEETING_IMAGE} from '../../../constants/Images/Images';

//On host joining the meet we are create a doc of baithak in db
export const onHostJoinMeet = async (
  meetConfig: VideoStreamParams,
  firebaseUser: UserInterface,
) => {
  //Create a document in meet collection and also in group collection
  try {
    const baithak = createBaithak(meetConfig, firebaseUser);

    if (!meetConfig.groupId) {
      //If the groundId not present it means we need to form a new group
      const newGroup = createGroupFromMeeting(meetConfig, firebaseUser);
      if (baithak && newGroup) {
        Promise.all([
          (await writeAsync(
            'Baithak',
            `${meetConfig.meetId}${meetConfig.password}`,
            baithak,
            false,
          ),
          await writeAsync(
            'groups',
            `${meetConfig.meetId}${meetConfig.password}`,
            newGroup,
            false,
          )),
        ]);
      }
    } else {
      //if meet id present we need to that group in baithak object so that we can fetch messages from that
      await writeAsync(
        'Baithak',
        `${meetConfig.meetId}${meetConfig.password}`,
        baithak,
        false,
      );
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
    groupId: meetConfig.groupId
      ? meetConfig.groupId
      : `${meetConfig.meetId}${meetConfig.password}`,
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

export const createGroupFromMeeting = (
  meetConfig: VideoStreamParams,
  firebaseUser: UserInterface,
): Group => {
  return {
    groupId: `${meetConfig.meetId}${meetConfig.password}`,
    groupName: meetConfig.channelName,
    description: meetConfig.description,
    groupImage: DEFAULT_GROUP_MEETING_IMAGE,
    createdAt: +new Date(),
    isDM: false,
    membersID: [firebaseUser.uid],
    membersDetails: [
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
