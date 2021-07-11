import {
  Baithak,
  JoinMeetForm,
  VideoStreamParams,
} from '../../../models/Meeting/CreateMeeting/interface';
import {generateToken} from './createMeeting';
import firestore from '@react-native-firebase/firestore';

export const onJoinMeet = async (
  meetDetails: JoinMeetForm,
  agoraId: number,
) => {
  try {
    //check for meetId and password
    const baithRef = await firestore()
      .collection('Baithak')
      .doc(`${meetDetails.meetId}${meetDetails.password}`)
      .get();

    //User has correct meetId and Password and get the channel name and generate tokens
    if (baithRef.exists) {
      const baithak = baithRef.data() as Baithak;

      //generate tokens
      const {token} = await generateToken(baithak.channelName, agoraId);
      if (token) {
        return {
          token: token,
          meetId: baithak.meetId,
          password: baithak.password,
          channelName: baithak.channelName,
          agoraId: agoraId,
          creater: 'Member',
        } as VideoStreamParams;
      }
    }
  } catch (err) {
    console.log('Error in onJoin method', err);
  }
};
