import {UserInterface, userStatusType} from '../../../models/User/User';
import {
  SET_FIREBASE_USER,
  UPDATE_FIREBASE_USER,
  UPDATE_USER_STATUS,
} from '../actions/action';

export interface firebaseUserAction {
  type: string;
  firebaseUser?: UserInterface;
  firebaseUserStatus: userStatusType;
}

//To update existing firebase user
export const updateFirebaseUser = (
  firebaseUser: UserInterface,
  firebaseUserStatus: userStatusType,
): firebaseUserAction => {
  return {
    type: UPDATE_FIREBASE_USER,
    firebaseUser: firebaseUser,
    firebaseUserStatus: firebaseUserStatus,
  };
};

//To set new firebase user
export const setFirebaseUser = (
  firebaseUser: UserInterface,
  firebaseUserStatus: userStatusType,
): firebaseUserAction => {
  return {
    type: SET_FIREBASE_USER,
    firebaseUser: firebaseUser,
    firebaseUserStatus: firebaseUserStatus,
  };
};

//To update user status
export const updateFirebaseUserStatus = (
  userStatus: userStatusType,
): firebaseUserAction => {
  return {
    type: UPDATE_USER_STATUS,
    firebaseUserStatus: userStatus,
  };
};
