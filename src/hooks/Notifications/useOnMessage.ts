import {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';

export interface TopBarNotificationUI {
  title: string | undefined;
  body: string | undefined;
  imageURL: string | undefined;
}

const useOnMessage = () => {
  const [notification, setNotification] = useState<TopBarNotificationUI>();

  useEffect(() => {
    const subscriber = messaging().onMessage((remoteMessage) => {
      if (remoteMessage && remoteMessage.notification) {
        setNotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          imageURL: remoteMessage.notification.android?.imageUrl,
        });
      }
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        // console.log(remoteMessage);
      })
      .catch((err) => console.log(err));

    messaging().onNotificationOpenedApp((remoteMessage) => {
      // console.log(remoteMessage);
    });

    return () => subscriber();
  }, []);

  return {
    notification,
    setNotification,
  };
};

export default useOnMessage;
