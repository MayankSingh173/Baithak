import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useState, useEffect, useCallback} from 'react';
import {IMessage} from 'react-native-gifted-chat';
import {Baithak} from '../../../models/Meeting/CreateMeeting/interface';
import {Message} from '../../../models/Messages/interface';
import {getUser} from '../../../utils/Messages/Meeting/utils';
import {debounce} from 'lodash';
import {getTime} from '../../../utils/Miscellaneous/utils';
import Toast from 'react-native-toast-message';

const useGetMeetMssg = (Baithak: Baithak) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const [lastMessage, setLastMssg] = useState<Message>();

  useEffect(() => {
    try {
      const unsubscribe = firestore()
        .collection('Baithak')
        .doc(`${Baithak.meetId}${Baithak.password}`)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .limit(15)
        .onSnapshot((querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              change.doc.exists && setLastMssg(change.doc.data() as Message);
            }
          });
          const chats: IMessage[] = [];
          querySnapshot.forEach((doc) => {
            const local_message = doc.exists && (doc.data() as Message);
            chats.push({
              _id: local_message.messageId,
              text: local_message.text,
              createdAt: local_message.createdAt,
              user: getUser(local_message.uid, Baithak),
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
  }, [Baithak]);

  const loadMore = useCallback(
    debounce(async () => {
      try {
        if (lastDoc) {
          setIsMoreLoading(true);
          const nextDocuments = firestore()
            .collection('groups')
            .doc(`${Baithak.meetId}${Baithak.password}`)
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
                  user: getUser(local_message.uid, Baithak),
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

  useEffect(() => {
    if (lastMessage) {
      const user = getUser(lastMessage.uid, Baithak);
      if (lastMessage.uid !== user._id) {
        Toast.show({
          type: 'success',
          text1: user.name,
          text2: lastMessage.text,
          position: 'bottom',
        });
      }
    }
  }, [lastMessage]);

  const handleSend = async (mssgs: IMessage[]) => {
    try {
      mssgs.map((m) => {
        const ref = firestore()
          .collection('Baithak')
          .doc(`${Baithak.meetId}${Baithak.password}`)
          .collection('messages')
          .doc();
        ref.set({
          messageId: ref.id,
          text: m.text,
          createdAt: getTime(m.createdAt),
          uid: m.user._id,
          ...(m.system && {system: m.system}),
        });
      });
    } catch (err) {
      console.log('Error in adding message', err);
    }
  };

  return {messages, handleSend, isMoreLoading, loadMore, lastDoc};
};

export default useGetMeetMssg;
