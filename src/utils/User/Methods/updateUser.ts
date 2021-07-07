import {writeAsync} from '../../Firestore/write';

export const updateUser = async (
  collectionId: string,
  docId: string,
  doc: any,
) => {
  try {
    await writeAsync(collectionId, docId, doc, true);
  } catch (error) {
    console.log('Error in updating firebase user', error);
  }
};
