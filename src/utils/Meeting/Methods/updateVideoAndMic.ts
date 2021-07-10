import {
  Baithak,
  MembersDetails,
} from '../../../models/Meeting/CreateMeeting/interface';
import {writeAsync} from '../../Firestore/write';

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
