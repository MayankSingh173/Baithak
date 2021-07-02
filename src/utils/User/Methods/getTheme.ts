import {Appearance} from 'react-native';
import {getRemoteUser} from './getRemoteUser';

export const getTheme = (): 'dark' | 'light' => {
  const theme = Appearance.getColorScheme();

  if (theme === 'dark') return 'dark';
  else if (theme === 'light') return 'light';
  else return 'dark';
};

export const getRemoteTheme = async (uid: string) => {
  const user = await getRemoteUser(uid);
  if (user) {
    return user.theme;
  }
};
