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
    //This listeners run when there's some notification comming while the app is running
    //We need to show top bar notification
    const subscriber = messaging().onMessage((remoteMessage) => {
      if (remoteMessage && remoteMessage.notification) {
        setNotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          imageURL: remoteMessage.notification.android?.imageUrl,
        });
      }
    });

    // Listener - When the application is opened from a quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        // console.log(remoteMessage);
      })
      .catch((err) => console.log(err));

    //Listener - When the application is running, but in the background.
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
