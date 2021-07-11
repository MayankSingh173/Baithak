import {
  Baithak,
  MembersDetails,
} from '../../../models/Meeting/CreateMeeting/interface';
import {writeAsync} from '../../Firestore/write';

//update the video state for the local user in the firestore
export const updateVideo = async (
  baithak: Baithak | undefined,
  uid: string,
  video: boolean,
) => {
  try {
    if (baithak) {
      const newMemberDetails: MembersDetails[] = [];

      for (const member of baithak.members) {
        if (member.uid === uid) {
          member.video = video;
        }
        newMemberDetails.push(member);
      }

      await writeAsync(
        'Baithak',
        `${baithak.meetId}${baithak.password}`,
        {members: newMemberDetails},
        true,
      );
    }
  } catch (error) {
    console.log('Error in updating video', error);
  }
};

//update the audio state for the local user in the firestore
export const updateAudio = async (
  baithak: Baithak | undefined,
  uid: string,
  audio: boolean,
) => {
  try {
    if (baithak) {
      const newMemberDetails: MembersDetails[] = [];

      for (const member of baithak.members) {
        if (member.uid === uid) {
          member.audio = audio;
        }
        newMemberDetails.push(member);
      }

      await writeAsync(
        'Baithak',
        `${baithak.meetId}${baithak.password}`,
        {members: newMemberDetails},
        true,
      );
    }
  } catch (error) {
    console.log('Error in updating audio', error);
  }
};
