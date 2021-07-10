import {useState} from 'react';
import Toast from 'react-native-toast-message';
import {
  CREATE_GROUP_SCREEN,
  GROUP_CHAT_SCREEN,
} from '../../constants/Navigation/Navigation';
import {UserInterface} from '../../models/User/User';
import {createDM} from '../../utils/Messages/Group/onCreateGroup';

const useGetSelecteMembers = (
  firebaseUser: UserInterface,
  navigation: any,
  toScreen: string,
  getSelectedMembers?: (member: UserInterface[] | undefined) => void,
) => {
  const [newGroupForming, setNewGroupForming] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<UserInterface[]>([
    firebaseUser,
  ]);

  const onPressNext = async () => {
    try {
      setNewGroupForming(true);

      if (toScreen === CREATE_GROUP_SCREEN) {
        //Is selctedUsers length > 1 create a group and ask for group name, description and group photo.
        //else create a dm
        if (selectedUsers.length > 2) {
          navigation.navigate(CREATE_GROUP_SCREEN, {
            selectedUsers: selectedUsers,
          });
        } else {
          //Function to create a dm and move to chat screen
          const newDM = await createDM(selectedUsers, firebaseUser);
          navigation.navigate(GROUP_CHAT_SCREEN, {
            group: newDM,
          });
        }
      } else {
        getSelectedMembers && getSelectedMembers(selectedUsers);
        navigation.goBack();
      }
      setNewGroupForming(false);
    } catch (error) {
      setNewGroupForming(false);
      console.log('Error on pressing Next', error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please Try Again!!',
        position: 'top',
      });
    }
  };

  const onSelectUser = (user: UserInterface, currCheck: boolean) => {
    if (currCheck) {
      setSelectedUsers((prev) => [...prev, user]);
    } else {
      const updatedUser = selectedUsers.filter((u) => u.uid !== user.uid);
      setSelectedUsers(updatedUser);
    }
  };

  return {
    onSelectUser,
    onPressNext,
    newGroupForming,
    selectedUsers,
  };
};

export default useGetSelecteMembers;
