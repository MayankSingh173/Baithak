import {UserInterface} from '../User/User';

export interface Task {
  taskId: string;
  title: string;
  description?: string;
  createdOn: number;
  date: number;
  startTime: number;
  endTime: number;
  status: 'ToDo' | 'Completed' | 'OnGoing';
  color: string;
  members?: UserInterface[];
  isMeeting?: boolean;
  meetId?: string;
  password?: string;
}

export interface TaskFormState {
  title: string;
  description: string;
}
