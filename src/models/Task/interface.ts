export interface Task {
  taskId: string;
  title: string;
  description?: string;
  createdOn: number;
  date: string;
  startTime: number;
  endTime: number;
  status: 'ToDo' | 'Completed' | 'OnGoing';
  color: string;
}

export interface TaskFormState {
  title: string;
  description: string;
}
