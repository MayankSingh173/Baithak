import {
  Baithak,
  VideoStreamParams,
} from '../../../models/Meeting/CreateMeeting/interface';
import {UserInterface} from '../../../models/User/User';
import {Group, Message} from '../../../models/Messages/interface';
import {writeAsync} from '../../Firestore/write';
import {DEFAULT_GROUP_MEETING_IMAGE} from '../../../constants/Images/Images';
import {onSendNotifToMembersOnMeeting} from '../../Notifications/Meeting/GroupMeeting/onSendNotifToMembersOnMeeting';
import {getShareMessage} from './getShareMessage';
import firestore from '@react-native-firebase/firestore';

//On host joining the meet we are creating a doc of baithak in db and also creating a group
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
      //if groupId is present it means user is creating baithak from the group
      await writeAsync(
        'Baithak',
        `${meetConfig.meetId}${meetConfig.password}`,
        baithak,
        false,
      );

      //send notification to all others members in the group
      onSendNotifToMembersOnMeeting(baithak);

      //send a message with baithak info in the group
      onSendMessageToGroup(baithak, firebaseUser, meetConfig.groupId);
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
        video: true,
        audio: true,
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

const onSendMessageToGroup = async (
  baithak: Baithak,
  firebaseUser: UserInterface,
  groupId: string,
) => {
  try {
    const shareMessage = getShareMessage(baithak);

    const messageRef = firestore()
      .collection('groups')
      .doc(groupId)
      .collection('messages')
      .doc();
    const lastMessageRef = firestore().collection('groups').doc(groupId);

    const message = {
      uid: baithak.host.uid,
      createdAt: +new Date(),
      text: shareMessage,
      messageId: messageRef.id,
    } as Message;

    Promise.all([
      await messageRef.set(message),

      await lastMessageRef.update({lastMessage: message}),
    ]);
  } catch (error) {
    console.log(
      'Error in last message in group while initiating baithak from group',
      error,
    );
  }
};
