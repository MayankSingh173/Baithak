import {IMessage} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

export const onDeleteMessage = async (
  message: IMessage,
  baithakId: string,
  uid: string,
) => {
  try {
    if (typeof message._id === 'string' && message.user._id === uid) {
      const groupRef = firestore().collection('groups').doc(baithakId);

      await groupRef.collection('messages').doc(message._id).delete();
    }
  } catch (err) {
    console.log('delete message', err);
  }
};
