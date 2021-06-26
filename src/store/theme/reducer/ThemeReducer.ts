import {updateThemeAction} from '../actionCreator/updateTheme';
import {Appearance, ColorSchemeName} from 'react-native';
import {UPDATE_THEME} from '../actions/action';

interface themes {
  theme: ColorSchemeName;
}

const initialThemeState: themes = {
  theme: 'dark',
};

const ThemeReducer = (
  state: themes = initialThemeState,
  action: updateThemeAction,
) => {
  switch (action.type) {
    case UPDATE_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};

export default ThemeReducer;
