import {
  Baithak,
  MembersDetails,
} from '../../../models/Meeting/CreateMeeting/interface';
import {Group} from '../../../models/Messages/interface';
import {updateAsync} from '../../Firestore/update';
import {getRemoteUser} from '../../User/Methods/getRemoteUser';

export const handleUnread = async (group: Group) => {
  try {
    const membersDetails = group.membersDetails;
    for (const member of membersDetails) {
      const memberData = await getRemoteUser(member.uid);
      if (
        memberData &&
        (!memberData.activeOnGroup ||
          memberData.activeOnGroup !== group.groupId)
      ) {
        member.unread++;
      }
    }

    await updateAsync('groups', group.groupId, {
      membersDetails: membersDetails,
    });
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
