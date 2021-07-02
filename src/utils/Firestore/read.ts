import firestore from '@react-native-firebase/firestore';

export const readAsync = async (collectionId: string, documentId: string) => {
  return (
    await firestore().collection(collectionId).doc(documentId).get()
  ).data();
};
