export interface CreateMeetForm {
  name: string;
  description?: string;
}

export interface JoinMeetForm {
  meetId: string;
  password: string;
}
