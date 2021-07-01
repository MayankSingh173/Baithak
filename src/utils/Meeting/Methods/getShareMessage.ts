import {Baithak} from '../../../models/Meeting/CreateMeeting/interface';

export const getShareMessage = (baithak: Baithak | undefined) => {
  if (baithak) {
    return `Would you like to join Baithak ? Here's a info

Baithak Id: ${baithak.meetId}
Password: ${baithak.password}
    
Cheers!
Get Vaccinated Soon!`;
  } else {
    return 'No Baithak Info';
  }
};
