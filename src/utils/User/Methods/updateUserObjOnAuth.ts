import {writeAsync} from '../../Firestore/write';

export const updateUserObjOnAuth = async (
  uid: string,
  os: 'android' | 'ios' | 'windows' | 'macos' | 'web',
  phone?: string,
  email?: string,
  referrerId?: string,
) => {
  await writeAsync(
    'users',
    uid,
    {
      uid: uid,
      ...(os ? {os: os} : {}),
      ...(phone ? {phone: phone} : {}),
      ...(email ? {email: email} : {}),
      ...(referrerId ? {referrerId: referrerId} : {}),
    },
    true,
  );
};
