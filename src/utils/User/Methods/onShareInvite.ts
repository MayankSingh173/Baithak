import {Share} from 'react-native';
import {INVITE_LINK} from '../../../constants/Links/links';

export const onShareInvite = async (name?: string) => {
  try {
    const messgae = `${
      name ? name : 'Someone'
    } is inviting you to download baithak app

Download link : ${INVITE_LINK}     

Cheers!
Get Vaccinated Soon!`;

    await Share.share({message: messgae});
  } catch (error) {
    console.log('Error in sharing invite link', error);
  }
};
