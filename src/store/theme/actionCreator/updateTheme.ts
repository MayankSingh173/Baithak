import {ColorSchemeName} from 'react-native';
import {UPDATE_THEME} from '../actions/action';

export interface updateThemeAction {
  type: typeof UPDATE_THEME;
  theme: ColorSchemeName;
}

export const updateTheme = (theme: ColorSchemeName): updateThemeAction => {
  return {
    type: UPDATE_THEME,
    theme: theme,
  };
};
