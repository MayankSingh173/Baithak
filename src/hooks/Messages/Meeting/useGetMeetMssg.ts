import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useState, useEffect, useCallback, useRef} from 'react';
import {IMessage} from 'react-native-gifted-chat';
import {Baithak} from '../../../models/Meeting/CreateMeeting/interface';
import {Message} from '../../../models/Messages/interface';
import {getBaithakPartiFromUid} from '../../../utils/Messages/Meeting/utils';
import {debounce} from 'lodash';
import {getTime} from '../../../utils/Miscellaneous/utils';
import Toast from 'react-native-toast-message';
import Sound from 'react-native-sound';
import {UserInterface} from '../../../models/User/User';
import {writeAsync} from '../../../utils/Firestore/write';
import {
  CameraOptions,
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {checkReadingMediaPermission} from '../../../utils/Permissions/Permission';
import {uploadToStorage} from '../../../utils/Storage/uploadToStorage';

const useGetMeetMssg = (Baithak: Baithak, firebaseUser: UserInterface) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const [selectImage, toggelSelectImage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  let sound = useRef<Sound | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = firestore()
        .collection('groups')
        .doc(Baithak.groupId)
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
                user: getBaithakPartiFromUid(local_message.uid, Baithak),
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
  }, [Baithak]);

  const loadMore = useCallback(
    debounce(async () => {
      try {
        if (lastDoc) {
          setIsMoreLoading(true);
          const nextDocuments = firestore()
            .collection('groups')
            .doc(Baithak.groupId)
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
                    user: getBaithakPartiFromUid(local_message.uid, Baithak),
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

  useEffect(() => {
    try {
      const subscriber = firestore()
        .collection('groups')
        .doc(Baithak.groupId)
        .collection('messages')
        .onSnapshot((querySnapshot) => {
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === 'added' && change.doc.exists) {
              const lastMessage = change.doc.data();
              const lastMessgageUser = getBaithakPartiFromUid(
                lastMessage.uid,
                Baithak,
              );
              if (lastMessage.uid !== firebaseUser.uid) {
                sound.current = new Sound(
                  'message.mp3',
                  Sound.MAIN_BUNDLE,
                  (error) => {
                    if (error) {
                      console.log('Error in playing message sound', error);
                    }
                    sound.current?.play(() => sound.current?.release());
                  },
                );

                sound.current?.play();

                Toast.show({
                  type: 'info',
                  text1: lastMessgageUser.name
                    ? lastMessgageUser.name
                    : 'Someone',
                  text2: lastMessage.text,
                  position: 'bottom',
                  bottomOffset: 100,
                });
              }
            }
          });
        });

      return () => subscriber();
    } catch (error) {
      console.log('Error in listinening to doc changes', error);
    }
  }, [Baithak.groupId, firebaseUser.uid]);

  const handleSend = async (mssgs: IMessage[]) => {
    try {
      mssgs.map(async (m) => {
        //Update lastMessage
        await writeAsync(
          'groups',
          Baithak.groupId,
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
          .doc(Baithak.groupId)
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
          `images/${Baithak.groupId}/${uri.substring(
            uri.lastIndexOf('/') + 1,
          )}`,
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
        .doc(Baithak.groupId)
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
    onCaptureImage,
    onSelectFromLibrary,
    loading,
    selectImage,
    onToggleSelectImage,
  };
};

export default useGetMeetMssg;
