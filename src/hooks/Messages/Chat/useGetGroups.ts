import {useCallback, useEffect, useState} from 'react';
import {Group} from '../../../models/Messages/interface';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {debounce} from 'lodash';

const useGetGroups = (uid: string) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const [selectMeet, setSelectMeet] = useState<boolean>(false);

  useEffect(() => {
    const suscriber = firestore()
      .collection('groups')
      .where('membersID', 'array-contains', uid)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .onSnapshot(
        (querySnapshot) => {
          if (querySnapshot) {
            const localGroups: Group[] = [];

            for (const doc of querySnapshot.docs) {
              doc.exists && localGroups.push(doc.data() as Group);
            }

            setGroups(localGroups);
            setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
            setFetched(true);
          } else {
            setFetched(true);
          }
        },
        (error) => {
          console.log(error);
          setFetched(true);
        },
      );

    return () => suscriber();
  }, [uid]);

  const nextPage = useCallback(
    debounce(async () => {
      try {
        if (lastDoc) {
          setIsMoreLoading(true);
          const nextDocuments = firestore()
            .collection('groups')
            .where('membersID', 'array-contains', uid)
            .orderBy('createdAt', 'desc')
            .startAfter(lastDoc)
            .limit(3)
            .onSnapshot((querySnapshot) => {
              if (querySnapshot) {
                const localGroups: Group[] = [];

                for (const doc of querySnapshot.docs) {
                  doc.exists && localGroups.push(doc.data() as Group);
                }

                setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
                setGroups((prev) => [...prev, ...localGroups]);
                setIsMoreLoading(false);
              } else {
                setIsMoreLoading(false);
              }
            });

          return () => nextDocuments();
        }
      } catch (error) {
        setIsMoreLoading(false);
        console.log('error next page', error);
      }
    }, 40),
    [lastDoc, uid],
  );

  return {
    groups,
    fetched,
    selectMeet,
    setSelectMeet,
    lastDoc,
    isMoreLoading,
    nextPage,
  };
};

export default useGetGroups;
