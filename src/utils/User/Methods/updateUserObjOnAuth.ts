import {writeAsync} from '../../Firestore/write';

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
      ...(os ? {os: os} : {}),
      ...(name ? {name: name} : {}),
      ...(phone ? {phone: phone} : {}),
      ...(email ? {email: email} : {}),
      ...(photoURL ? {photoURL: photoURL} : {}),
    },
    true,
  );
};
