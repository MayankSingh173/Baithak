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
import {
  CameraOptions,
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {uploadToStorage} from '../../../utils/Storage/uploadToStorage';
import {checkReadingMediaPermission} from '../../../utils/Permissions/Permission';

const useGetMessages = (
  group: Group,
  navigation: any,
  firebaseUser: UserInterface,
) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const [groupInfo, toggleGroupInfo] = useState<boolean>(false);
  const [selectImage, toggelSelectImage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
                ...(local_message.image && {image: local_message.image}),
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
                    ...(local_message.image && {image: local_message.image}),
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

  const onToggleSelectImage = () => toggelSelectImage(!selectImage);

  const onCaptureImage = async () => {
    onToggleSelectImage();
    await checkReadingMediaPermission();
    const options: CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchCamera(options, async (response) => {
      if (response.errorMessage || response.errorCode) {
        Toast.show({
          type: 'error',
          text1: 'Try Again!!',
          text2: 'Something went wrong',
          position: 'top',
        });
      } else if (response.assets) {
        await onCreateImageMessage(response.assets[0].uri);
      }
    });
  };

  const onSelectFromLibrary = async () => {
    onToggleSelectImage();
    await checkReadingMediaPermission();
    const options: ImageLibraryOptions = {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, async (response) => {
      if (response.errorCode || response.errorMessage) {
        Toast.show({
          type: 'error',
          text1: 'Try Again!!',
          text2: 'Something went wrong',
          position: 'top',
        });
      } else if (response.assets) {
        await onCreateImageMessage(response.assets[0].uri);
      }
    });
  };

  const onCreateImageMessage = async (uri?: string) => {
    try {
      setLoading(true);
      if (uri) {
        const downloadUrl = await uploadToStorage(
          `images/${group.groupId}/${uri.substring(uri.lastIndexOf('/') + 1)}`,
          uri,
        );
        if (downloadUrl) {
          await createImageMessage(downloadUrl);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error in creating image/video message', error);
      Toast.show({
        type: 'error',
        text1: 'Try Again!!',
        text2: 'Something went wrong',
        position: 'top',
      });
    }
  };

  const createImageMessage = async (url: string) => {
    try {
      const messRef = firestore()
        .collection('groups')
        .doc(group.groupId)
        .collection('messages')
        .doc();

      const newMessage: Message = {
        messageId: messRef.id,
        text: '',
        createdAt: +new Date(),
        uid: firebaseUser.uid,
        image: url,
      };

      await messRef.set(newMessage);
    } catch (error) {
      console.log('Error in creating image/video message', error);
    }
  };

  return {
    messages,
    handleSend,
    isMoreLoading,
    loadMore,
    lastDoc,
    groupInfo,
    toggleGroupInfoModal,
    onCaptureImage,
    onSelectFromLibrary,
    loading,
    selectImage,
    onToggleSelectImage,
  };
};

export default useGetMessages;
