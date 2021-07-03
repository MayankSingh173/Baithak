import {UserInterface} from '../../../models/User/User';
import firestore from '@react-native-firebase/firestore';
import {Group} from '../../../models/Messages/interface';
import {MembersDetails} from '../../../models/Meeting/CreateMeeting/interface';

export const onCreateGroup = async (
  name: string,
  selctedMemeber: UserInterface[],
  description?: string,
  groupImage?: string,
) => {
  try {
    const groupRef = firestore().collection('groups').doc();

    const membersID: string[] = [];
    const membersDetails: MembersDetails[] = [];

    selctedMemeber.forEach((member) => {
      membersID.push(member.uid);
      membersDetails.push({
        uid: member.uid,
        imageUrl: member.photoURL,
        name: member.name,
        agoraId: member.agoraId,
      });
    });

    const group = {
      groupId: groupRef.id,
      groupName: name,
      description: description,
      groupImage: groupImage,
      membersID: membersID,
      membersDetails: membersDetails,
    } as Group;
    await groupRef.set(group);

    return group;
  } catch (error) {
    console.log('Error in creating group', error);
  }
};
