import {MembersDetails} from '../../../models/Meeting/CreateMeeting/interface';
import {getRefinedText} from '../../Miscellaneous/utils';

//It will reture the names of all members separate by ','. Like user1, user2, user3
export const getMembersName = (members: MembersDetails[], maxLen: number) => {
  const memberNames: string[] = [];

  members.forEach((member) =>
    memberNames.push(member.name ? member.name : 'Robot'),
  );
  return getRefinedText(memberNames.join(', '), maxLen);
};
