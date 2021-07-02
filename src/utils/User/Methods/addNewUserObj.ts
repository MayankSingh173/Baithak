import {UserInterface} from '../../../models/User/User';
import {writeAsync} from '../../Firestore/write';
import {createNewUserObj} from './createNewUserObj';

export const addNewUserObj = async (
  uid: string,
  os: 'android' | 'ios' | 'windows' | 'macos' | 'web',
  theme: 'light' | 'dark',
  email: string,
  name?: string,
  photoURL?: string,
  mergeCondition?: boolean,
) => {
  const agora_ID = randomUId();
  const newUser = createNewUserObj(
    agora_ID,
    uid,
    os,
    theme,
    email,
    name,
    photoURL,
  );
  await writeUserObj(newUser, mergeCondition ? true : false);
};

export const writeUserObj = async (
  user: UserInterface,
  mergeCondition: boolean,
) => {
  await writeAsync('users', user.uid, user, mergeCondition);
};

export const randomUId = () => {
  var maxInt = 2147483647; // max 32-bit signed int
  // generate random value between 1 and maxInt inclusive of both values
  return Math.floor(Math.random() * maxInt) + 1;
};
