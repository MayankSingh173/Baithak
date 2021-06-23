import {updateThemeAction} from '../actionCreator/updateTheme';
import {Appearance, ColorSchemeName} from 'react-native';
import {UPDATE_THEME} from '../actions/Theme';

interface themes {
  theme: ColorSchemeName;
}

const initialState: themes = {
  theme: Appearance.getColorScheme(),
};

const ThemeReducer = (
  state: themes = initialState,
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
