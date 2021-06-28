import {JoinMeetForm} from '../../../models/Meeting/CreateMeeting/interface';
import {generateToken} from './createMeeting';

export const onJoinMeet = async (
  meetDetails: JoinMeetForm,
  agoraId: number,
) => {
  //generate tokens
  const {token} = await generateToken(meetDetails.meetId, agoraId);
  return {token};
};
