import firestore from '@react-native-firebase/firestore';

//Reading a doc from firestore
export const readAsync = async (collectionId: string, documentId: string) => {
  return (
    await firestore().collection(collectionId).doc(documentId).get()
  ).data();
};
