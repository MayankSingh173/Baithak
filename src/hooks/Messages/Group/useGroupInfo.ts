import {Group} from '../../../models/Messages/interface';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {CHAT_HOME_SCREEN} from '../../../constants/Navigation/Navigation';
import {generalErrorN} from '../../../components/Alerts/GeneralError';

const useGroupInfo = (group: Group, uid: string, navigation: any) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const onLeaveGroup = async () => {
    try {
      setLoading(true);
      const newMemberDetails = group.membersDetails.filter(
        (m) => m.uid !== uid,
      );
      const newMemberID = group.membersID.filter((m) => m !== uid);

      await firestore()
        .collection('groups')
        .doc(group.groupId)
        .update({membersID: newMemberID, membersDetails: newMemberDetails});

      navigation.navigate(CHAT_HOME_SCREEN);
    } catch (error) {
      setLoading(false);
      console.log('Error in leaving the group', error);
    }
  };

  const confirmEnd = () => {
    generalErrorN(
      {
        title: 'Leave group',
        textMessage: 'Are you sure you want to leave the group?',
        okText: 'Yes',
      },
      [
        {
          text: 'No',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: onLeaveGroup,
        },
      ],
    );
  };

  return {
    isLoading,
    setLoading,
    confirmEnd,
  };
};

export default useGroupInfo;
