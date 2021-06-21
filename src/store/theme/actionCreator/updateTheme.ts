import {UPDATE_THEME} from '../actions/Theme';

export interface updateThemeAction {
  type: typeof UPDATE_THEME;
  theme: 'light' | 'dark';
}

export const updateTheme = (theme: 'light' | 'dark'): updateThemeAction => {
  return {
    type: UPDATE_THEME,
    theme: theme,
  };
};
