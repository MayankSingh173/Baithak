import moment from 'moment';

//convert timne to string
export const timeToString = (time: any) => {
  return moment(new Date(time)).format('YYYY-MM-DD');
};
