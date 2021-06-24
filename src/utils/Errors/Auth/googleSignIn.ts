import {statusCodes} from '@react-native-google-signin/google-signin';

export const getErrorMessage = (error: any) => {
  if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    return 'Google play services are not available. This method is not compatible with your OS';
  }
  if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    return 'Sign in cancelled by the user';
  }

  return error.message;
};
