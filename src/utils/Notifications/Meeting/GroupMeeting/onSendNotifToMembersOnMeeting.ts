import {BASE_URL, NOTIFICATION} from '../../../../constants/Api/apiEndPoints';
import {Baithak} from '../../../../models/Meeting/CreateMeeting/interface';
import {Group} from '../../../../models/Messages/interface';
import {UserInterface} from '../../../../models/User/User';
import {postRequest} from '../../../Api/apiRequest';
import {readAsync} from '../../../Firestore/read';

export const onSendNotifToMembersOnMeeting = async (baithak: Baithak) => {
  try {
    const result = await getMemberTokens(baithak.groupId, baithak.host.uid);

    const creator = (await readAsync(
      'users',
      baithak.host.uid,
    )) as UserInterface;

    if (result && creator && result.group) {
      const title = `Baithak is going on!🤩`;
      const body = `${
        creator.name ? creator.name : 'Someone'
      } has created a baithak in ${
        result.group.groupName ? result.group.groupName : 'group'
      }`;

      const imageURL = creator.photoURL
        ? creator.photoURL
        : result.group.groupImage;

      const payload: NotificationPayload = {
        title: title,
        body: body,
        imageUrl: imageURL,
        tokens: result.tokens,
      };

      const URL = `${BASE_URL}${NOTIFICATION}`;

      console.log(URL, payload);

      const response = await postRequest(URL, payload);
    }
  } catch (error) {
    console.log('Error in sending meeting messages', error);
  }
};

export const getMemberTokens = async (groupId: string, hostUid: string) => {
  try {
    let group = (await readAsync('groups', groupId)) as Group;
    let tokens: string[] = [];
    if (group) {
      for (const member of group.membersID) {
        if (member !== hostUid) {
          const membersDetails = (await readAsync(
            'users',
            member,
          )) as UserInterface;

          if (membersDetails && membersDetails.tokens) {
            tokens = tokens.concat(membersDetails.tokens);
          }
        }
      }
    }

    return {tokens, group};
  } catch (error) {
    console.log('Error in fetchig tokens', error);
  }
};
