import {writeAsync} from '../../Firestore/write';
import {randomUId} from './addNewUserObj';

export const updateUserObjOnAuth = async (
  uid: string,
  os: 'android' | 'ios' | 'windows' | 'macos' | 'web',
  name?: string,
  phone?: string,
  email?: string,
  photoURL?: string,
) => {
  await writeAsync(
    'users',
    uid,
    {
      uid: uid,
      agoraId: randomUId(),
      ...(os ? {os: os} : {}),
      ...(name ? {name: name} : {}),
      ...(phone ? {phone: phone} : {}),
      ...(email ? {email: email} : {}),
      ...(photoURL ? {photoURL: photoURL} : {}),
    },
    true,
  );
};
