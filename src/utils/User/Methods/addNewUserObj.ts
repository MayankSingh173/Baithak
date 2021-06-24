import {UserInterface} from '../../../models/User/User';
import {writeAsync} from '../../Firestore/write';
import {createNewUserObj} from './createNewUserObj';

export const addNewUserObj = async (
  uid: string,
  os: 'android' | 'ios' | 'windows' | 'macos' | 'web',
  phone?: string,
  email?: string,
  mergeCondition?: boolean,
) => {
  const newUser = createNewUserObj(uid, os, phone, email);
  await writeUserObj(newUser, mergeCondition ? true : false);
};

export const writeUserObj = async (
  user: UserInterface,
  mergeCondition: boolean,
) => {
  await writeAsync('users', user.uid, user, mergeCondition);
};
