import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useState, useEffect, useCallback} from 'react';
import {IMessage} from 'react-native-gifted-chat';
import {Group, Message} from '../../../models/Messages/interface';
import {debounce} from 'lodash';
import {getTime} from '../../../utils/Miscellaneous/utils';
import {getMemberDetailsFromUid} from '../../../utils/Messages/Group/getMemberDetailsFromUid';
import {
  handleUnread,
  removeUnread,
} from '../../../utils/Messages/Group/handleUnread';
import {CHAT_HOME_SCREEN} from '../../../constants/Navigation/Navigation';
import {changeGroupActivity} from '../../../utils/Messages/Group/changeGroupActivity';
import {UserInterface} from '../../../models/User/User';
import {writeAsync} from '../../../utils/Firestore/write';

const useGetMessages = (
  group: Group,
  navigation: any,
  firebaseUser: UserInterface,
) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const [groupInfo, toggleGroupInfo] = useState<boolean>(false);

  useEffect(() => {
    try {
      const unsubscribe = firestore()
        .collection('groups')
        .doc(`${group.groupId}`)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .limit(15)
        .onSnapshot((querySnapshot) => {
          if (querySnapshot) {
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
          }
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
              if (querySnapshot) {
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
    [lastDoc],
  );

  const handleSend = async (mssgs: IMessage[]) => {
    try {
      mssgs.map(async (m) => {
        //Update lastMessage
        await writeAsync(
          'groups',
          group.groupId,
          {
            lastMessage: {
              text: mssgs[0].text,
              sendBy: mssgs[0].user._id,
              sendAt: getTime(mssgs[0].createdAt),
            },
          },
          true,
        );

        const ref = firestore()
          .collection('groups')
          .doc(`${group.groupId}`)
          .collection('messages')
          .doc();

        const newMess: Message = {
          messageId: ref.id,
          text: m.text,
          createdAt: getTime(m.createdAt),
          uid: typeof m.user._id === 'string' ? m.user._id : '',
          ...(m.system && {system: m.system}),
        };

        await ref.set(newMess);

        //This wiil change the unread for offline users in the group
        await handleUnread(group, newMess, firebaseUser);
      });
    } catch (err) {
      console.log('Error in adding message', err);
    }
  };

  //On user back button move to chat home screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      e.preventDefault();
      unsubscribe();
      navigation.navigate(CHAT_HOME_SCREEN); //Navigate to Chat home screen
    });

    //Making user active on this group
    changeGroupActivity(firebaseUser.uid, group.groupId);

    //Remove unread
    removeUnread(group, firebaseUser.uid);

    return () => {
      //Making user inactive on this group
      changeGroupActivity(firebaseUser.uid);
    };
  }, []);

  const toggleGroupInfoModal = () => {
    toggleGroupInfo(!groupInfo);
  };

  return {
    messages,
    handleSend,
    isMoreLoading,
    loadMore,
    lastDoc,
    groupInfo,
    toggleGroupInfoModal,
  };
};

export default useGetMessages;
