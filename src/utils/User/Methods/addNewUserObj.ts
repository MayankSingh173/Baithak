import {UserInterface} from '../../../models/User/User';
import {writeAsync} from '../../Firestore/write';
import {createNewUserObj} from './createNewUserObj';

export const addNewUserObj = async (
  uid: string,
  os: 'android' | 'ios' | 'windows' | 'macos' | 'web',
  name?: string,
  phone?: string,
  email?: string,
  photoURL?: string,
  mergeCondition?: boolean,
) => {
  const newUser = createNewUserObj(uid, os, name, phone, email, photoURL);
  await writeUserObj(newUser, mergeCondition ? true : false);
};

export const writeUserObj = async (
  user: UserInterface,
  mergeCondition: boolean,
) => {
  await writeAsync('users', user.uid, user, mergeCondition);
};
