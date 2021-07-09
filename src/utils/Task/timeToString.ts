import moment from 'moment';

export const timeToString = (time: any) => {
  return moment(new Date(time)).format('YYYY-MM-DD');
};
