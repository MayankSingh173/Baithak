import {
  defaultUser,
  UserInterface,
  userStatusType,
} from '../../../models/User/User';
import {firebaseUserAction} from '../actionCreator/addFirebaseUser';

import {
  SET_FIREBASE_USER,
  UPDATE_FIREBASE_USER,
  UPDATE_USER_STATUS,
} from '../actions/action';

interface UserState {
  firebaseUser: UserInterface;
  userStatus: userStatusType;
}

//Initial UserState
const initialUserState: UserState = {
  userStatus: 'PENDING',
  firebaseUser: defaultUser,
};

//Main User Reducer
const UserReducer = (
  state: UserState = initialUserState,
  action: firebaseUserAction,
): UserState => {
  switch (action.type) {
    case UPDATE_USER_STATUS:
      return {
        ...state,
        userStatus: action.firebaseUserStatus,
      };
    case UPDATE_FIREBASE_USER:
      return {
        ...state,
        firebaseUser: {
          ...state.firebaseUser,
          ...action.firebaseUser,
        },
        userStatus: action.firebaseUserStatus,
      };
    case SET_FIREBASE_USER:
      return {
        ...state,
        firebaseUser: action.firebaseUser ? action.firebaseUser : defaultUser,
        userStatus: action.firebaseUserStatus,
      };
    default:
      return state;
  }
};

export default UserReducer;
