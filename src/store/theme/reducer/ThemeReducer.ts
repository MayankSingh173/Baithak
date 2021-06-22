import {updateThemeAction} from '../actionCreator/updateTheme';
import {Appearance} from 'react-native';
import {UPDATE_THEME} from '../actions/Theme';

interface themes {
  theme: 'light' | 'dark';
}

const initialState: themes = {
  theme: 'dark',
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
