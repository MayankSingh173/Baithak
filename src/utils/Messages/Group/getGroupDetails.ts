import {
  DEFAULT_AVATAR,
  DEFAULT_GROUP_IMAGE,
} from '../../../constants/Images/Images';
import {Group, Message} from '../../../models/Messages/interface';

//This function will return the appropriate group details according to whether it is dm or not
export const getGroupDetails = (
  group: Group,
  myUid: string,
): {
  groupName: string;
  groupImage: string;
  lastMessage?: Message;
  otherPersonId?: string;
} => {
  if (group && !group.isDM) {
    return {
      groupName: group.groupName ? group.groupName : 'New Group',
      groupImage: group.groupImage ? group.groupImage : DEFAULT_GROUP_IMAGE,
      lastMessage: group.lastMessage,
    };
  } else {
    let newGroupName: string | undefined = undefined;
    let newGroupImage: string | undefined = undefined;
    let otherPersonId: string | undefined = undefined;
    group.membersDetails.forEach((member) => {
      if (member.uid !== myUid) {
        newGroupName = member.name;
        newGroupImage = member.imageUrl;
        otherPersonId = member.uid;
      }
    });

    return {
      groupName: newGroupName ? newGroupName : 'Robot',
      groupImage: newGroupImage ? newGroupImage : DEFAULT_AVATAR,
      lastMessage: group.lastMessage,
      otherPersonId: otherPersonId,
    };
  }
};
