import {BASE_URL, NOTIFICATION} from '../../../constants/Api/apiEndPoints';
import {BAITHAK_ICON} from '../../../constants/Images/Images';
import {postRequest} from '../../Api/apiRequest';

export const showWelcomeNotifi = async (
  tokens: string[],
  name: string | null | undefined,
) => {
  try {
    const title = `Welcome ${name ? name : 'user'} !!😊`;
    const body = 'Thank you so much for joining this fam💕';
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
    const title = `Will miss you! ${name}😢`;
    const body = 'I hope you will be get back to the fam💕';
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
