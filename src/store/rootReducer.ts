import {combineReducers} from 'redux';
import ThemeReducer from './theme/reducer/ThemeReducer';

const rootReducer = combineReducers({
  ThemeReducer: ThemeReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
