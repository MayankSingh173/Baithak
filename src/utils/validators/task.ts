import * as Yup from 'yup';

export const addTaskSchema = Yup.object().shape({
  title: Yup.string().required('Tile is required'),
});
