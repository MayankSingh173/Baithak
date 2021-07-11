import {DEFAULT_AVATAR} from '../../../constants/Images/Images';
import {Baithak} from '../../../models/Meeting/CreateMeeting/interface';

export interface mediaState {
  audio?: boolean;
  video?: boolean;
  imageUrl?: string;
}

//Get the audio and video state for the local user from the firestore
export const getLocalAudioAndVideoStates = (
  baithak: Baithak | undefined,
  uid: string,
): mediaState | undefined => {
  if (baithak) {
    for (const member of baithak.members) {
      if (member.uid === uid) {
        return {
          video: member.video,
          audio: member.audio,
          imageUrl: member.imageUrl,
        };
      }
    }
  } else {
    return {video: true, audio: true, imageUrl: DEFAULT_AVATAR};
  }
};

//Get the audio and video state for the remote user from the firestore
export const getRemoteAudioAndVideoStates = (
  baithak: Baithak | undefined,
  peerId: number,
): mediaState | undefined => {
  if (baithak) {
    for (const member of baithak.members) {
      if (member.agoraId === peerId) {
        return {
          video: member.video,
          audio: member.audio,
          imageUrl: member.imageUrl,
        };
      }
    }
  } else {
    return {video: true, audio: true, imageUrl: DEFAULT_AVATAR};
  }
};
