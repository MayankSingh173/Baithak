import {ColorSchemeName} from 'react-native';
import {UPDATE_THEME, UPDATE_THEME_REMOTELY} from '../actions/action';

export interface updateThemeAction {
  type: typeof UPDATE_THEME;
  theme: 'light' | 'dark';
}

export interface updateThemeRemoteAction {
  type: typeof UPDATE_THEME_REMOTELY;
  theme: 'light' | 'dark';
  uid: string;
}

export const updateTheme = (theme: 'light' | 'dark'): updateThemeAction => {
  return {
    type: UPDATE_THEME,
    theme: theme,
  };
};

export const updateThemeRemotely = (
  theme: 'light' | 'dark',
  uid: string,
): updateThemeRemoteAction => {
  return {
    type: UPDATE_THEME_REMOTELY,
    theme: theme,
    uid: uid,
  };
};
