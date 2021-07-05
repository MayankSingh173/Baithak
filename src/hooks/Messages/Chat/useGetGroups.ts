import {useEffect, useState} from 'react';
import {Group} from '../../../models/Messages/interface';
import firestore from '@react-native-firebase/firestore';

const useGetGroups = (uid: string) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectMeet, setSelectMeet] = useState<boolean>(false);

  useEffect(() => {
    const suscriber = firestore()
      .collection('groups')
      .where('membersID', 'array-contains', uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          if (querySnapshot) {
            const localGroups = [];
            for (const doc of querySnapshot.docs) {
              doc.exists && localGroups.push(doc.data() as Group);
            }
            setGroups(localGroups);
          }
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
        },
      );

    return () => suscriber();
  }, [uid]);

  return {
    groups,
    loading,
    selectMeet,
    setSelectMeet,
  };
};

export default useGetGroups;
