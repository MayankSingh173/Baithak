import {useEffect, useState} from 'react';
import {UserInterface} from '../../models/User/User';
import firestore from '@react-native-firebase/firestore';
import {CREATE_GROUP_SCREEN} from '../../constants/Navigation/Navigation';

const useGetUsers = (navigation?: any) => {
  const [users, setUsers] = useState<UserInterface[]>();
  const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');

  //This is for userAddSearchScreen
  const [selectedUsers, setSelectedUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot((querySnapshot) => {
        const localUsers: UserInterface[] = [];
        for (const doc of querySnapshot.docs) {
          doc.exists && localUsers.push(doc.data() as UserInterface);
        }
        setUsers(localUsers);
        setFilteredUsers(localUsers);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  const handleQuery = (text: string) => {
    const filterUsers = users?.filter((user) => {
      return user.name
        ? user.name.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1
        : false;
    });
    setFilteredUsers(filterUsers);
    setQuery(text);
  };

  const onPressNext = () => {
    //Is selctedUsers length > 1 create a group and ask for group name, description and group photo.
    //else create a dm

    if (selectedUsers.length > 1) {
      navigation.navigate(CREATE_GROUP_SCREEN, {selectedUsers: selectedUsers});
    } else {
      //Function to create a dm and move to chat screen
    }
    console.log('Next');
  };

  return {
    filteredUsers,
    loading,
    query,
    handleQuery,
    selectedUsers,
    setSelectedUsers,
    onPressNext,
  };
};

export default useGetUsers;
