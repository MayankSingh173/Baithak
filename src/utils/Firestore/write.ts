import firestore from '@react-native-firebase/firestore';

// write a doc in firestorea
export const writeAsync = (
  collectionId: string,
  documentId: string,
  document: any,
  mergeCondition: boolean,
) => {
  return firestore()
    .collection(collectionId)
    .doc(documentId)
    .set(document, mergeCondition ? {merge: mergeCondition} : {});
};
