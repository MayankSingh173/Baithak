import {
  TITLE,
  TEXT_MESSAGE,
  OK_TEXT,
} from '../../constants/Alerts/GeneralError';
import {Alert} from 'react-native';

export const generalError = (
  successHandler: () => void,
  messageTextObj: any,
) => {
  Alert.alert(
    messageTextObj ? messageTextObj.title : TITLE,
    messageTextObj ? messageTextObj.textMessage : TEXT_MESSAGE,
    [
      {
        text: messageTextObj ? messageTextObj.okText : OK_TEXT,
        onPress: successHandler ? () => successHandler() : () => {},
      },
    ],
  );
};

export const generalErrorN = (messageTextObj: any, nList: any) => {
  Alert.alert(
    messageTextObj ? messageTextObj.title : TITLE,
    messageTextObj ? messageTextObj.textMessage : TEXT_MESSAGE,
    [...nList],
  );
};
