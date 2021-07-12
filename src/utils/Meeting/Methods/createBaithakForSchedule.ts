import {DEFAULT_GROUP_IMAGE} from '../../../constants/Images/Images';
import {
  Baithak,
  MembersDetails,
} from '../../../models/Meeting/CreateMeeting/interface';
import {Group, Message} from '../../../models/Messages/interface';
import {UserInterface} from '../../../models/User/User';
import {writeAsync} from '../../Firestore/write';
import {generateMeetIdAndPassword} from './createMeeting';
import firestore from '@react-native-firebase/firestore';
import {Task} from '../../../models/Task/interface';
import {setScheduleNotification} from '../../Notifications/Task/setScheduleNotification';
import moment from 'moment';
import {getScheduleMessage} from './getShareMessage';
import {postRequest} from '../../Api/apiRequest';
import {BASE_URL, NOTIFICATION} from '../../../constants/Api/apiEndPoints';
import {createMeetLink} from './onSharingMeetLink';

export const createBaithakForSchedule = async (
  members: UserInterface[],
  name: string,
  firebaseUser: UserInterface,
  task: Task,
  joinOn: number,
  description?: string,
) => {
  const createdAt: number = +new Date();
  const {meetId, password} = generateMeetIdAndPassword();
  const groupId = `${meetId}${password}`;

  //create a new baithak
  const baithak = await formScheduleBaithak(
    meetId,
    password,
    name,
    firebaseUser,
    createdAt,
    groupId,
    description,
  );

  //Create a group
  await formScheduleGroup(
    members,
    firebaseUser,
    groupId,
    name,
    createdAt,
    joinOn,
    description,
    baithak,
  );

  //create a task for each members
  await createScheduleTask(
    task,
    members,
    name,
    createdAt,
    meetId,
    password,
    joinOn,
    description,
  );

  //send notification to all members
  await sendNotificationToAllMembers(members, firebaseUser, joinOn);
};

const sendNotificationToAllMembers = async (
  members: UserInterface[],
  firebaseUser: UserInterface,
  joinOn: number,
) => {
  try {
    let tokens: string[] = [];
    const title = 'Baithak Schedule';
    const body = `${
      firebaseUser.name ? firebaseUser.name : 'Baithak User'
    } has schedule a baithak on ${moment(joinOn).format(
      'MMMM Do YYYY, h:mm a',
    )}`;

    for (const member of members) {
      if (member.uid !== firebaseUser.uid && member.tokens) {
        tokens = tokens.concat(member.tokens);
      }
    }

    if (tokens.length > 0) {
      const payload: NotificationPayload = {
        title: title,
        tokens: tokens,
        body: body,
        imageUrl: firebaseUser.photoURL,
      };

      const URL = `${BASE_URL}${NOTIFICATION}`;
      const res = await postRequest(URL, payload);
    }
  } catch (error) {
    console.log('error in sendding schedule baithak notification', error);
  }
};

const createScheduleTask = async (
  task: Task,
  members: UserInterface[],
  name: string,
  createdAt: number,
  meetId: string,
  password: string,
  joinOn: number,
  description?: string,
) => {
  try {
    for (const member of members) {
      const taskRef = firestore()
        .collection('users')
        .doc(member.uid)
        .collection('task')
        .doc();

      await taskRef.set({
        ...task,
        taskId: taskRef.id,
        title: name,
        description: description,
        createdOn: createdAt,
        meetId: meetId,
        password: password,
      } as Task);

      //create a reminder notification
      //schedule a reminder notification
      await setScheduleNotification(
        {
          ...task,
          taskId: taskRef.id,
          title: name,
          description: description,
          createdOn: createdAt,
        },
        member.uid,
        joinOn,
      );
    }
  } catch (error) {
    console.log('Error in creating schedule task', error);
  }
};

const formScheduleBaithak = async (
  meetId: string,
  password: string,
  name: string,
  firebaseUser: UserInterface,
  createdAt: number,
  groundId: string,
  description?: string,
) => {
  try {
    const baithak: Baithak = {
      meetId: meetId,
      password: password,
      members: [],
      channelName: name,
      description: description,
      host: {
        agoraId: firebaseUser.agoraId,
        uid: firebaseUser.uid,
      },
      groupId: groundId,
      createAt: createdAt,
    };

    await writeAsync('Baithak', baithak.groupId, baithak, true);

    return baithak;
  } catch (error) {
    console.log('Error in creating Schedule baithak', error);
  }
};

const formScheduleGroup = async (
  members: UserInterface[],
  firebaseUser: UserInterface,
  groupId: string,
  name: string,
  createdAt: number,
  joinOn: number,
  description?: string,
  baithak?: Baithak,
) => {
  try {
    const membersDetails: MembersDetails[] = [];
    const membersID: string[] = [];

    for (const member of members) {
      let unread = 0;
      if (member.uid !== firebaseUser.uid) {
        unread = 1;
      }
      membersDetails.push({
        uid: member.uid,
        agoraId: member.agoraId,
        imageUrl: member.photoURL,
        name: member.name,
        unread: unread,
      });

      membersID.push(member.uid);
    }

    const newGroup: Group = {
      groupId: groupId,
      groupImage: DEFAULT_GROUP_IMAGE,
      groupName: name,
      description: description,
      isDM: false,
      membersDetails: membersDetails,
      membersID: membersID,
      createdAt: createdAt,
    };

    await writeAsync('groups', groupId, newGroup, true);

    if (baithak) {
      const messageRef = firestore()
        .collection('groups')
        .doc(groupId)
        .collection('messages')
        .doc();

      const link = await createMeetLink(baithak.meetId, baithak.password);

      if (link) {
        const message = getScheduleMessage(
          baithak,
          joinOn,
          firebaseUser.name,
          link,
        );

        let newMessage: Message = {
          text: message,
          uid: firebaseUser.uid,
          createdAt: createdAt,
          messageId: messageRef.id,
        };

        await messageRef.set(newMessage);

        await writeAsync('groups', groupId, {lastMessage: newMessage}, true);
      } else {
        await firestore()
          .collection('groups')
          .doc(groupId)
          .collection('messages')
          .doc(messageRef.id)
          .delete();
      }
    }
  } catch (error) {
    console.log('Error in creating schedule group', error);
  }
};
