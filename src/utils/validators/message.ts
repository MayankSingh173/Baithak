import * as Yup from 'yup';

export const createGroupSchema = Yup.object().shape({
  groupName: Yup.string().required('Name is required'),
});
