import {ACCESS_TOKEN, BASE_URL} from '../../../constants/Api/apiEndPoints';
import {CreateMeetForm} from '../../../models/Meeting/CreateMeeting/interface';
import {getRequest} from '../../Api/apiRequest';

export const onCreateMeet = async (meetDetails: CreateMeetForm) => {
  //generate tokens
  const token = await generateToken(meetDetails);
  console.log(token);
  return token;
};

const generateToken = async (meetDetails: CreateMeetForm): Promise<string> => {
  const URL: string = `${BASE_URL}${ACCESS_TOKEN}?channelName=${meetDetails.name}`;
  const req = await getRequest(URL);
  return req.token;
};
