import {BASE_URL, NOTIFICATION} from '../../../constants/Api/apiEndPoints';
import {BAITHAK_ICON} from '../../../constants/Images/Images';
import {postRequest} from '../../Api/apiRequest';

export const showWelcomeNotifi = async (
  tokens: string[],
  name: string | null | undefined,
) => {
  try {
    const title = `Welcome ${name ? name : 'user'} !!ð`;
    const body = 'Thank you so much for joining this famð';
    const imageURL = BAITHAK_ICON;

    if (tokens) {
      const payload: NotificationPayload = {
        title: title,
        body: body,
        imageUrl: imageURL,
        tokens: tokens,
      };

      const url = `${BASE_URL}${NOTIFICATION}`;
      await postRequest(url, payload);
    }
  } catch (error) {
    console.log('Error in sending welcome notification');
  }
};

export const showLogOutNotifi = async (tokens?: string[], name?: string) => {
  try {
    const title = `Will miss you! ${name}ð¢`;
    const body = 'I hope you will be get back to the famð';
    const imageURL = BAITHAK_ICON;

    if (tokens) {
      const payload: NotificationPayload = {
        title: title,
        body: body,
        imageUrl: imageURL,
        tokens: tokens,
      };

      const url = `${BASE_URL}${NOTIFICATION}`;
      await postRequest(url, payload);
    }
  } catch (error) {
    console.log('Error in sending logout notification', error);
  }
};
