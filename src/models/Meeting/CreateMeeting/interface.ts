import {UserInterface} from '../../User/User';

export interface Baithak {
  channelName: string;
  meetId: string;
  password: string;
  createAt: number;
  host: Host;
  members: MembersDetails[];
  description?: string;
}

export interface Host {
  agoraId: number;
  uid: string;
}

export interface MembersDetails {
  uid: string;
  name?: string;
  agoraId: number;
  imageUrl?: string;
}
export interface VideoStreamParams {
  token: string;
  meetId: string;
  password: string;
  channelName: string;
  agoraId: number;
  creater: 'Host' | 'Member';
  description?: string;
}

export interface CreateMeetForm {
  name: string;
  description?: string;
}

export interface JoinMeetForm {
  meetId: string;
  password: string;
}
