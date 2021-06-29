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

const generateMeetIdAndPassword = () => {
  const meetId = randPassword(10, 0, 0);
  const password = randPassword(3, 3, 3);
  return {meetId, password};
};

//This function generate a random password.
function randPassword(letters: number, numbers: number, either: number) {
  var chars = [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', // letters
    '0123456789', // numbers
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', // either
  ];

  return [letters, numbers, either]
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
