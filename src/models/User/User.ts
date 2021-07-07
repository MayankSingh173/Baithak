import {getTheme} from '../../utils/User/Methods/getTheme';

export interface UserInterface {
  uid: string;
  name?: string;
  email: string;
  os?: 'android' | 'ios' | 'macos' | 'windows' | 'web';
  photoURL?: string;
  bio?: string;
  tagLine?: string;
  agoraId: number;
  theme: 'dark' | 'light';
  activeOnGroup?: string;
  tokens?: string[];
  notifications?: boolean;
  instagram?: string;
  facebook?: string;
  github?: string;
  linkedIn?: string;
  twitter?: string;
  joinedOn?: number;
}

export const defaultUser: UserInterface = {
  uid: '',
  agoraId: 0,
  email: `example@gmail.com`,
  theme: getTheme(),
};

export type userStatusType = 'PENDING' | 'FAIL' | 'SUCCESS' | 'FETCHING';

export interface userFormState {
  name?: string;
  tagLine?: string;
  bio?: string;
  email: string;
  instagram?: string;
  facebook?: string;
  github?: string;
  linkedIn?: string;
  twitter?: string;
}
