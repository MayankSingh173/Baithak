import axios from 'axios';

//APIs get and post request
export const getRequest = async (url: string) => {
  const data = await axios
    .get(url)
    .then((resp: any) => resp.data)
    .catch((err: any) => ({error: err}));
  return data;
};

export const postRequest = async (url: string, payload: any) => {
  const data = await axios
    .post(url, payload)
    .then((resp) => resp.data)
    .catch((err) => ({error: err}));
  return data;
};
