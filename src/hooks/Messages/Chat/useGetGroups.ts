import {useEffect, useState} from 'react';
import {MembersDetails} from '../../../models/Meeting/CreateMeeting/interface';
import {Group} from '../../../models/Messages/interface';
import firestore from '@react-native-firebase/firestore';

const useGetGroups = (uid: string) => {
  const [newMembers, setNewMembers] = useState<MembersDetails>();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectMeet, setSelectMeet] = useState<boolean>(false);

  useEffect(() => {
    try {
      const suscriber = firestore()
        .collection('groups')
        .where('membersID', 'array-contains', uid)
        .onSnapshot((querySnapshot) => {
          const localGroups = [];
          for (const doc of querySnapshot.docs) {
            doc.exists && localGroups.push(doc.data() as Group);
          }

          setGroups(localGroups);
          setLoading(false);
        });

      return () => suscriber();
    } catch (error) {
      console.log('Error in fetching groups', error);
    }
  }, [uid]);

  return {
    groups,
    newMembers,
    setNewMembers,
    loading,
    selectMeet,
    setSelectMeet,
  };
};

export default useGetGroups;
