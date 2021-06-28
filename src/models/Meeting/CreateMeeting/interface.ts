import {UserInterface} from '../../User/User';

export interface Baithak {
  channelName: string;
  meetId: string;
  password: string;
  createAt: number;
  hostId: string;
  memebers: string[];
  membersDetails: UserInterface[];
  description?: string;
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
