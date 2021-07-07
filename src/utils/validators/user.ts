import * as Yup from 'yup';

export const editProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  tagLine: Yup.string().required('Tagline is required'),
  bio: Yup.string().required('Bio is required'),
  email: Yup.string()
    .email('The email is invalid')
    .required('Email is required'),
});
