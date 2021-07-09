import React from 'react';
import {View, StyleSheet, AppState} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry, Text} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as appTheme} from './src/themes/custom-theme.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/rootReducer';
import MainNavigator from './src/navigation/MainNavigator';
import {LogBox} from 'react-native';
import Toast from 'react-native-toast-message';
import useOnMessage from './src/hooks/Notifications/useOnMessage';
import TopBarNotification from './src/components/UI/TopBarNotification/TopBarNotification';
import {removeActivityFromUser} from './src/utils/User/Methods/removeActivity';
import PushNotification from 'react-native-push-notification';
import {DEFAULT_USER_NAME} from './src/constants/User/User';

LogBox.ignoreAllLogs();

const App = () => {
  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const {notification, setNotification} = useOnMessage();

  AppState.addEventListener('change', async (state) => {
    if (state === 'background' || state === 'inactive') {
      //Remove activeOnGroup so that we can send notifications if there's any
      await removeActivityFromUser(firebaseUser);
    }
  });

  PushNotification.createChannel(
    {
      channelId: firebaseUser.uid, // (required)
      channelName: firebaseUser.name ? firebaseUser.name : DEFAULT_USER_NAME, // (required)
      channelDescription: 'A default channel', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) =>
      console.log(`createChannel 'default-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{...(theme && eva[theme]), ...appTheme}}>
        <View style={styles.main}>
          {notification && (
            <View style={styles.notification}>
              <TopBarNotification
                data={notification}
                removeNotification={() => setNotification(undefined)}
              />
            </View>
          )}
          <MainNavigator />
        </View>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ApplicationProvider>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  notification: {
    zIndex: 2,
  },
});

export default () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SafeAreaProvider>
  );
};
