import {MembersDetails} from '../Meeting/CreateMeeting/interface';

export interface Message {
  messageId: string;
  text: string;
  createdAt: number;
  uid: string;
  system: boolean;
}

export interface Group {
  groupId: string;
  groupName?: string;
  groupImage?: string;
  description?: string;
  isDM: boolean;
  createdAt: number;
  membersID: string[];
  membersDetails: MembersDetails[];
  lastMessage?: Message;
}

export interface groupForm {
  groupName: string;
  description?: string;
}
