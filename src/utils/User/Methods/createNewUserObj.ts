import {UserInterface} from '../../../models/User/User';

//This method will create a new user object
export const createNewUserObj = (
  agoraId: number,
  uid: string,
  os: 'android' | 'ios' | 'macos' | 'windows' | 'web',
  theme: 'light' | 'dark',
  joinedOn: number,
  email: string,
  name?: string,
  photoURL?: string,
): UserInterface => {
  return {
    agoraId: agoraId,
    uid: uid,
    theme: theme,
    email: email,
    joinedOn: joinedOn,
    notifications: true,
    ...(os ? {os: os} : {}),
    ...(name ? {name: name} : {}),
    ...(photoURL ? {photoURL: photoURL} : {}),
  };
};
