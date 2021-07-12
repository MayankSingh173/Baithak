import moment from 'moment';
import {Baithak} from '../../../models/Meeting/CreateMeeting/interface';
import {getBaithakPartiFromUid} from '../../Messages/Meeting/utils';

//The method contruct a share message when sharing the meet info from the meeting
export const getShareMessage = (baithak: Baithak | undefined, link: string) => {
  if (baithak) {
    return `${
      getBaithakPartiFromUid(baithak.host.uid, baithak).name
    } would like you to join baithak? Here's a info

Topic: ${baithak.channelName}
${baithak.description ? 'Decription: ' + baithak?.description : ''}
Created At: ${moment(baithak.createAt).format('MMMM Do YYYY, h:mm:ss a')}  

Joining link: ${link}

You can also join with following credentials

Baithak Id: ${baithak.meetId}
Password: ${baithak.password}
    
Cheers!
Get Vaccinated Soon!`;
  } else {
    return 'No Baithak Info';
  }
};

//The method contruct a share message when sharing the meet info from the schedule baithak screen
export const getScheduleMessage = (
  baithak: Baithak,
  joinOn: number,
  name: string | undefined,
  link: string,
) => {
  return `${
    name ? name : 'Someone'
  } would like you to join baithak? Here's a info

Topic: ${baithak.channelName}
${baithak.description ? 'Decription: ' + baithak?.description : ''}
Join At: ${moment(joinOn).format('MMMM Do YYYY, h:mm:ss a')}  

Joining link: ${link}

You can also join with following credentials
  
Baithak Id: ${baithak.meetId}
Password: ${baithak.password}
  
Cheers!
Get Vaccinated Soon!`;
};
