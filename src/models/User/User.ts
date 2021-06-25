export interface UserInterface {
  uid: string;
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  os?: 'android' | 'ios' | 'macos' | 'windows' | 'web';
  photoURL?: string;
}

export const defaultUser: UserInterface = {
  uid: '',
};

export type userStatusType = 'PENDING' | 'FAIL' | 'SUCCESS' | 'FETCHING';
