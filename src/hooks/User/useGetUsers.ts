import {useEffect, useState} from 'react';
import {UserInterface} from '../../models/User/User';
import firestore from '@react-native-firebase/firestore';

const useGetUsers = (uid: string) => {
  const [users, setUsers] = useState<UserInterface[]>();
  const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');

  //Fetch all users other the current user
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .where('uid', '!=', uid)
      .onSnapshot(
        (querySnapshot) => {
          if (querySnapshot) {
            const localUsers: UserInterface[] = [];
            for (const doc of querySnapshot.docs) {
              doc.exists && localUsers.push(doc.data() as UserInterface);
            }
            setUsers(localUsers);
            setFilteredUsers(localUsers);
            setLoading(false);
          } else {
            setLoading(false);
          }
        },
        (err) => {
          console.log(err);
        },
      );

    return () => subscriber();
  }, [uid]);

  //Keyword search on the names of users
  const handleQuery = (text: string) => {
    const filterUsers = users?.filter((user) => {
      return user.name
        ? user.name.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) !== -1
        : false;
    });
    setFilteredUsers(filterUsers);
    setQuery(text);
  };

  return {
    filteredUsers,
    loading,
    query,
    handleQuery,
  };
};

export default useGetUsers;
