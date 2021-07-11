import firestore from '@react-native-firebase/firestore';

//update a doc in firestore
export const updateAsync = (
  collectionId: string,
  documentId: string,
  document: any,
) => {
  return firestore().collection(collectionId).doc(documentId).update(document);
};
