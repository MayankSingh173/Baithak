import { Group } from '../../../models/Messages/interface';

export const getMemberDetailsFromUid = (uid: string, group: Group) => {
   const userData = group.membersDetails.find((user) => user.uid === uid);
  return {
    _id: uid,
    ...(userData && {name: userData.name}),
    ...(userData && {avatar: userData.imageUrl}),
  };
}