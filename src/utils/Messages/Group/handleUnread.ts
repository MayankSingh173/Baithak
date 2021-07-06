import {MembersDetails} from '../../../models/Meeting/CreateMeeting/interface';
import {Group, Message} from '../../../models/Messages/interface';
import {UserInterface} from '../../../models/User/User';
import {updateAsync} from '../../Firestore/update';
import {sendMessageNotification} from '../../Notifications/Message/sendMessageNotifications';
import {getRemoteUser} from '../../User/Methods/getRemoteUser';

export interface tokensObj {
  uid: string;
  name?: string;
  tokens?: string[];
}

export const handleUnread = async (
  group: Group,
  newMess: Message,
  firebaseUser: UserInterface,
) => {
  try {
    const membersDetails = group.membersDetails;
    const tokensObject: tokensObj[] = [];
    for (const member of membersDetails) {
      const memberData = await getRemoteUser(member.uid);
      if (
        memberData &&
        (!memberData.activeOnGroup ||
          memberData.activeOnGroup !== group.groupId)
      ) {
        member.unread++;
        tokensObject.push({
          uid: member.uid,
          tokens: memberData.tokens,
          name: memberData.name,
        });
      }
    }

    //Update group unreads
    await updateAsync('groups', group.groupId, {
      membersDetails: membersDetails,
    });

    //Send notifications
    await sendMessageNotification(tokensObject, newMess, group, firebaseUser);
  } catch (error) {
    console.log('Error in updating unread', error);
  }
};

export const removeUnread = async (group: Group, uid: string) => {
  try {
    const membersDetails = group.membersDetails;
    for (const member of membersDetails) {
      if (member.uid === uid) {
        member.unread = 0;
        break;
      }
    }

    await updateAsync('groups', group.groupId, {
      membersDetails: membersDetails,
    });
  } catch (error) {
    console.log('Error in removing unread', error);
  }
};

export const getUnread = (groupMembers: MembersDetails[], myUid: string) => {
  return groupMembers.filter((m) => m.uid === myUid)[0].unread;
};
