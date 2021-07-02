import {
  updateThemeAction,
  updateThemeRemoteAction,
} from '../actionCreator/updateTheme';
import {Appearance, ColorSchemeName} from 'react-native';
import {UPDATE_THEME, UPDATE_THEME_REMOTELY} from '../actions/action';
import {writeAsync} from '../../../utils/Firestore/write';
import {getTheme} from '../../../utils/User/Methods/getTheme';

interface themes {
  theme: 'light' | 'dark';
}

const initialThemeState: themes = {
  theme: getTheme(),
};

const ThemeReducer = (
  state: themes = initialThemeState,
  action: updateThemeAction | updateThemeRemoteAction,
): themes => {
  switch (action.type) {
    case UPDATE_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case UPDATE_THEME_REMOTELY:
      writeAsync('users', action.uid, {theme: action.theme}, true).catch(
        (err) => console.log('error in updating theme remotely', err),
      );
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};

export default ThemeReducer;
