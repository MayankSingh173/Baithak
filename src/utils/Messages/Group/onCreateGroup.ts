import {UserInterface} from '../../../models/User/User';
import firestore from '@react-native-firebase/firestore';
import {Group} from '../../../models/Messages/interface';
import {MembersDetails} from '../../../models/Meeting/CreateMeeting/interface';
import {checkDMExist} from './checkDMExists';
import {DEFAULT_AVATAR} from '../../../constants/Images/Images';

//This function will create group with selected members chosen from user add search screen
export const onCreateGroup = async (
  name: string,
  selectedMemeber: UserInterface[],
  description?: string,
  groupImage?: string,
) => {
  try {
    const groupRef = firestore().collection('groups').doc();

    const membersID: string[] = [];
    const membersDetails: MembersDetails[] = [];

    selectedMemeber.forEach((member) => {
      membersID.push(member.uid);
      membersDetails.push({
        uid: member.uid,
        imageUrl: member.photoURL ? member.photoURL : DEFAULT_AVATAR,
        name: member.name ? member.name : 'Robot',
        agoraId: member.agoraId,
        unread: 0,
      });
    });

    const group = {
      groupId: groupRef.id,
      groupName: name,
      description: description,
      groupImage: groupImage,
      membersID: membersID,
      membersDetails: membersDetails,
      isDM: false,
      createdAt: +new Date(),
    } as Group;

    await groupRef.set(group);
    return group;
  } catch (error) {
    console.log('Error in creating group', error);
  }
};

//This will create a DM. If DM already, then it will return the details of it
export const createDM = async (
  selectedMemeber: UserInterface[],
  firebaseUser: UserInterface,
) => {
  try {
    const result = await checkDMExist(
      selectedMemeber.filter((m) => m.uid !== firebaseUser.uid)[0],
      firebaseUser,
    );

    if (result && result.exist && result.group) {
      return result.group;
    }

    const groupRef = firestore().collection('groups').doc();

    const membersID: string[] = [];
    const membersDetails: MembersDetails[] = [];

    selectedMemeber.forEach((member) => {
      membersID.push(member.uid);
      membersDetails.push({
        uid: member.uid,
        imageUrl: member.photoURL ? member.photoURL : DEFAULT_AVATAR,
        name: member.name ? member.name : 'Robot',
        agoraId: member.agoraId,
        unread: 0,
      });
    });

    const group = {
      groupId: groupRef.id,
      isDM: true,
      membersDetails: membersDetails,
      membersID: membersID,
      createdAt: +new Date(),
    } as Group;

    await groupRef.set(group);

    return group;
  } catch (error) {
    console.log('Error in creating DM', error);
  }
};
