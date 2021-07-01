import {Baithak} from '../../../models/Meeting/CreateMeeting/interface';

export const getUser = (user_id: string, baithak: Baithak) => {
  const userData = baithak.members.find((user) => user.uid === user_id);
  return {
    _id: user_id,
    ...(userData && {name: userData.name}),
    ...(userData && {avatar: userData.imageUrl}),
  };
};
