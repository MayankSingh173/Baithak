import {JOIN_MEET_SCREEN} from '../../../constants/Navigation/Navigation';
import {navigate} from '../../../navigation/RootNavigation/RootNavigation';

const queryString = require('query-string');

export const handelMeetLinks = (url: string) => {
  const {query} = queryString.parseUrl(url);

  navigate(JOIN_MEET_SCREEN, {meetId: query.meetId, password: query.password});
};
