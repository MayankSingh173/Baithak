export interface UserInterface {
  uid: string;
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  os?: 'android' | 'ios' | 'macos' | 'windows' | 'web';
  photoURL?: string;
  agoraId: number;
}

export const defaultUser: UserInterface = {
  uid: '',
  agoraId: 0,
};

export type userStatusType = 'PENDING' | 'FAIL' | 'SUCCESS' | 'FETCHING';
