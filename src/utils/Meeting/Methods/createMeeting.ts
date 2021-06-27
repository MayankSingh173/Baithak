import {ACCESS_TOKEN, BASE_URL} from '../../../constants/Api/apiEndPoints';
import {CreateMeetForm} from '../../../models/Meeting/CreateMeeting/interface';
import {getRequest} from '../../Api/apiRequest';

export const onCreateMeet = async (
  meetDetails: CreateMeetForm,
  agoraId: number,
) => {
  //generate tokens
  const {token, channelName} = await generateToken(meetDetails, agoraId);
  return {token, channelName};
};

const generateToken = async (meetDetails: CreateMeetForm, agoraId: number) => {
  const {meetId, password} = generateMeetIdAndPassword();

  //channel name will contain name, meetId and password
  const channelName = `${meetDetails.name}=${meetId}=${password}`;

  //Fetch URL
  const URL: string = `${BASE_URL}${ACCESS_TOKEN}?channelName=${channelName}&uid=${agoraId}&expireTime${
    24 * 60 * 60
  }`;
  //Fetching request
  const req = await getRequest(URL);
  console.log(req);
  return {token: req.token, channelName};
};

const generateMeetIdAndPassword = () => {
  const meetId = randPassword(10, 0, 0);
  const password = randPassword(3, 3, 3);
  return {meetId, password};
};

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
