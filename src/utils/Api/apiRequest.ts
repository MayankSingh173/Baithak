import axios from 'axios';

export const getRequest = async (url: string) => {
  const data = await axios
    .get(url)
    .then((resp: any) => resp.data)
    .catch((err: any) => ({error: err}));
  return data;
};
