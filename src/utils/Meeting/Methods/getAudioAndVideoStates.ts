import {DEFAULT_AVATAR} from '../../../constants/Images/Images';
import {Baithak} from '../../../models/Meeting/CreateMeeting/interface';

export interface mediaState {
  audio?: boolean;
  video?: boolean;
  imageUrl?: string;
}

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

export const getRemoteAudioAndVideoStates = (
  baithak: Baithak | undefined,
  peerId: number,
): mediaState | undefined => {
  if (baithak) {
    for (const member of baithak.members) {
      if (member.agoraId === peerId) {
        return {
          video: member.video ? member.video : true,
          audio: member.audio ? member.audio : true,
          imageUrl: member.imageUrl ? member.imageUrl : DEFAULT_AVATAR,
        };
      }
    }
  } else {
    return {video: true, audio: true, imageUrl: DEFAULT_AVATAR};
  }
};
