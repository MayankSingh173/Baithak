import dynamicLinks from '@react-native-firebase/dynamic-links';
import {BASE_URL} from '../../../constants/Api/apiEndPoints';

export const createMeetLink = async (meetId: string, password: string) => {
  try {
    const link = await dynamicLinks().buildLink({
      link: `${BASE_URL}/join?meetId=${meetId}&password=${password}`,
      domainUriPrefix: 'https://baithakapp.page.link',
    });

    return link;
  } catch (error) {
    console.log('Error in creating meet link', error);
  }
};
