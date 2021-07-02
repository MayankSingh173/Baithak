import moment from 'moment';
import {Baithak} from '../../../models/Meeting/CreateMeeting/interface';
import {getBaithakPartiFromUid} from '../../Messages/Meeting/utils';

export const getShareMessage = (baithak: Baithak | undefined) => {
  if (baithak) {
    return `${
      getBaithakPartiFromUid(baithak.host.uid, baithak).name
    } would like you to join baithak? Here's a info

Topic: ${baithak.channelName}
${baithak.description ? 'Decription: ' + baithak?.description : ''}
Created At: ${moment(baithak.createAt).format('MMMM Do YYYY, h:mm:ss a')}  
    
Baithak Id: ${baithak.meetId}
Password: ${baithak.password}
    
Cheers!
Get Vaccinated Soon!`;
  } else {
    return 'No Baithak Info';
  }
};
