import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useState, useEffect, useCallback} from 'react';
import {IMessage} from 'react-native-gifted-chat';
import {Group, Message} from '../../../models/Messages/interface';
import {debounce} from 'lodash';
import {getTime} from '../../../utils/Miscellaneous/utils';
import {getMemberDetailsFromUid} from '../../../utils/Messages/Group/getMemberDetailsFromUid';
import {handleUnread} from '../../../utils/Messages/Group/handleUnread';

const useGetMessages = (group: Group) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      const unsubscribe = firestore()
        .collection('groups')
        .doc(`${group.groupId}`)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .limit(15)
        .onSnapshot((querySnapshot) => {
          const chats: IMessage[] = [];
          querySnapshot.forEach((doc) => {
            const local_message = doc.exists && (doc.data() as Message);
            chats.push({
              _id: local_message.messageId,
              text: local_message.text,
              createdAt: local_message.createdAt,
              user: getMemberDetailsFromUid(local_message.uid, group),
              system: local_message.system,
            });
          });

          setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
          setMessages(chats);
        });
      return () => {
        unsubscribe();
      };
    } catch (err) {
      console.log(err);
    }
  }, [group]);

  const loadMore = useCallback(
    debounce(async () => {
      try {
        if (lastDoc) {
          setIsMoreLoading(true);
          const nextDocuments = firestore()
            .collection('groups')
            .doc(`${group.groupId}`)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .startAfter(lastDoc)
            .limit(10)
            .onSnapshot((querySnapshot) => {
              const chats: IMessage[] = [];
              querySnapshot.forEach((doc) => {
                const local_message = doc.exists && (doc.data() as Message);
                chats.push({
                  _id: local_message.messageId,
                  text: local_message.text,
                  createdAt: local_message.createdAt,
                  user: getMemberDetailsFromUid(local_message.uid, group),
                  system: local_message.system,
                });
              });

              setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
              setMessages((prev) => [...prev, ...chats]);
              setIsMoreLoading(false);
            });
          return () => nextDocuments();
        }
      } catch (error) {
        setIsMoreLoading(false);
        console.log('error next page', error);
      }
    }, 40),
    [lastDoc],
  );

  const handleSend = async (mssgs: IMessage[]) => {
    try {
      mssgs.map(async (m) => {
        //Update lastMessage
        await firestore()
          .collection('groups')
          .doc(group.groupId)
          .update({
            lastMessage: {
              text: mssgs[0].text,
              sendBy: mssgs[0].user._id,
              sendAt: getTime(mssgs[0].createdAt),
            },
          });

        const ref = firestore()
          .collection('groups')
          .doc(`${group.groupId}`)
          .collection('messages')
          .doc();
        ref.set({
          messageId: ref.id,
          text: m.text,
          createdAt: getTime(m.createdAt),
          uid: m.user._id,
          ...(m.system && {system: m.system}),
        });

        await handleUnread(group);
      });
    } catch (err) {
      console.log('Error in adding message', err);
    }
  };

  return {messages, handleSend, isMoreLoading, loadMore, lastDoc};
};

export default useGetMessages;
