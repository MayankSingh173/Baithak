import {UserInterface} from '../../../models/User/User';

export const createNewUserObj = (
  uid: string,
  os: 'android' | 'ios' | 'macos' | 'windows' | 'web',
  phone?: string,
  email?: string,
): UserInterface => {
  return {
    uid: uid,
    ...(os ? {os: os} : {}),
    ...(phone ? {phone: phone} : {}),
    ...(email ? {email: email} : {}),
  };
};
