import {getTheme} from '../../utils/User/Methods/getTheme';

export interface UserInterface {
  uid: string;
  name?: string;
  email: string;
  gender?: string;
  os?: 'android' | 'ios' | 'macos' | 'windows' | 'web';
  photoURL?: string;
  bio?: string;
  tagLine?: string;
  agoraId: number;
  theme: 'dark' | 'light';
}

export const defaultUser: UserInterface = {
  uid: '',
  agoraId: 0,
  email: `example@gmail.com`,
  theme: getTheme(),
};

export type userStatusType = 'PENDING' | 'FAIL' | 'SUCCESS' | 'FETCHING';
