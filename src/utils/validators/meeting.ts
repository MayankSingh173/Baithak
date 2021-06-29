import * as Yup from 'yup';

export const createMeetingSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

export const joinMeetingSchema = Yup.object().shape({
  meetId: Yup.string().required('Baithak Id is required'),
  password: Yup.string().required('Password is required'),
});
