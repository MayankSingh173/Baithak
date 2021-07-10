import {ACCESS_TOKEN, BASE_URL} from '../../../constants/Api/apiEndPoints';
import {CreateMeetForm} from '../../../models/Meeting/CreateMeeting/interface';
import {getRequest} from '../../Api/apiRequest';

export const onCreateMeet = async (
  meetDetails: CreateMeetForm,
  agoraId: number,
) => {
  try {
    //create a random id and password
    const {meetId, password} = generateMeetIdAndPassword();

    //generate tokens
    const {token} = await generateToken(meetDetails.name, agoraId);
    return {token, meetId, password};
  } catch (err) {
    console.log('Error in genrating token', err);
  }
};

export const generateToken = async (channelName: string, agoraId: number) => {
  //Fetch URL
  const URL: string = `${BASE_URL}${ACCESS_TOKEN}?channelName=${channelName}&uid=${agoraId}`;

  //Fetching request
  const req = await getRequest(URL);
  return {token: req.token};
};

export const generateMeetIdAndPassword = () => {
  const meetId = randPassword(0, 9, 0);
  const password = randPassword(0, 4, 5);
  return {meetId, password};
};

//This function generate a random password.
function randPassword(uppercase: number, numbers: number, lowercase: number) {
  var chars = [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ', //Uppercase letters
    '0123456789', // numbers
    'abcdefghijklmnopqrstuvwxyz', // Lowercase letters
  ];

  return [uppercase, numbers, lowercase]
    .map(function (len, i) {
      return Array(len)
        .fill(chars[i])
        .map(function (x) {
          return x[Math.floor(Math.random() * x.length)];
        })
        .join('');
    })
    .concat()
    .join('')
    .split('')
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join('');
}
