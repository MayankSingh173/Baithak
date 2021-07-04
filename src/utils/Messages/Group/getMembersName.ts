import {MembersDetails} from '../../../models/Meeting/CreateMeeting/interface';
import {getRefinedText} from '../../Miscellaneous/utils';

export const getMembersName = (members: MembersDetails[], maxLen: number) => {
  const memberNames: string[] = [];

  members.forEach((member) =>
    memberNames.push(member.name ? member.name : 'Robot'),
  );
  return getRefinedText(memberNames.join(', '), maxLen);
};
