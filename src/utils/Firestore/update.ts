import firestore from '@react-native-firebase/firestore';

export const updateAsync = (
  collectionId: string,
  documentId: string,
  document: any,
) => {
  return firestore().collection(collectionId).doc(documentId).update(document);
};
