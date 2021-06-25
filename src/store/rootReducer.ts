import {combineReducers} from 'redux';
import ThemeReducer from './theme/reducer/ThemeReducer';
import UserReducer from './User/reducer/userReducer';

//To combine all reducers
const rootReducer = combineReducers({
  ThemeReducer: ThemeReducer,
  UserReducer: UserReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
