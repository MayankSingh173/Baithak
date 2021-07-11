import {BASE_URL, NOTIFICATION} from '../../../constants/Api/apiEndPoints';
import {Group, Message} from '../../../models/Messages/interface';
import {UserInterface} from '../../../models/User/User';
import {postRequest} from '../../Api/apiRequest';
import {tokensObj} from '../../Messages/Group/handleUnread';

//This method will send message notification to all the offline members in the group
export const sendMessageNotification = async (
  tokensObj: tokensObj[],
  newMess: Message,
  group: Group,
  firebaseUser: UserInterface,
) => {
  try {
    if (!tokensObj) return;

    const title = group.isDM ? firebaseUser.name : group.groupName;
    const body = group.isDM
      ? newMess.text
      : `${firebaseUser.name}: ${newMess.text}`;
    const imageURL = group.isDM ? firebaseUser.photoURL : group.groupImage;

    let tokens: string[] = [];

    for (const obj of tokensObj) {
      if (obj.tokens) {
        tokens = tokens.concat(obj.tokens);
      }
    }

    if (tokens.length === 0) return;

    const payload: NotificationPayload = {
      title: title ? title : 'New Message!!',
      body: body,
      tokens: tokens,
      data: firebaseUser,
      imageUrl: imageURL,
    };

    const URL = `${BASE_URL}${NOTIFICATION}`;

    const res = await postRequest(URL, payload);
    console.log(res);
  } catch (error) {
    console.log('Error in sending message Notification', error);
  }
};
