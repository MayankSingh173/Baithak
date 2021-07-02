import {Baithak} from '../../../models/Meeting/CreateMeeting/interface';

export const getBaithakPartiFromUid = (user_id: string, baithak: Baithak) => {
  const userData = baithak.members.find((user) => user.uid === user_id);
  return {
    _id: user_id,
    ...(userData && {name: userData.name}),
    ...(userData && {avatar: userData.imageUrl}),
  };
};

export const getBaithakPartiFromAgoraId = (
  agoraId: number,
  baithak: Baithak | undefined,
) => {
  const userData = baithak?.members.find((user) => user.agoraId === agoraId);
  return {
    _id: userData?.uid,
    ...(userData && {name: userData.name}),
    ...(userData && {avatar: userData.imageUrl}),
  };
};
