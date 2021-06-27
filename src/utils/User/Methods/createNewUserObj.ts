import {UserInterface} from '../../../models/User/User';

export const createNewUserObj = (
  agoraId: number,
  uid: string,
  os: 'android' | 'ios' | 'macos' | 'windows' | 'web',
  name?: string,
  phone?: string,
  email?: string,
  photoURL?: string,
): UserInterface => {
  return {
    agoraId: agoraId,
    uid: uid,
    ...(os ? {os: os} : {}),
    ...(name ? {name: name} : {}),
    ...(phone ? {phone: phone} : {}),
    ...(email ? {email: email} : {}),
    ...(photoURL ? {photoURL: photoURL} : {}),
  };
};
