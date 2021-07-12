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
import useDynamicLink from './src/hooks/User/useDynamicLinks';

//Remove warning signs in the app
LogBox.ignoreAllLogs();

const App = () => {
  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const {notification, setNotification} = useOnMessage();

  //Appstate listeners- when the app is in background or inactive state
  // we need to remove activity i.e. activeOnGroup field of UserInterface so that neccessary notification can triggers
  AppState.addEventListener('change', async (state) => {
    if (state === 'background' || state === 'inactive') {
      //Remove activeOnGroup so that we can send notifications if there's any
      await removeActivityFromUser(firebaseUser);
    }
  });

  PushNotification.createChannel(
    {
      channelId: firebaseUser.uid, //subscribe the firebase user to its channel...this is required to trigger schedule notification
      channelName: firebaseUser.name ? firebaseUser.name : DEFAULT_USER_NAME, // (required)
      channelDescription: 'A default channel', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      vibrate: true, // (optional) default: true.
    },
    (created) => {}, //callback funct
  );

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      {/* Theme provider */}
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
        {/* Setting a ref for toast messages */}
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
      {/* Provide Redux store to the app */}
      <Provider store={store}>
        <App />
      </Provider>
    </SafeAreaProvider>
  );
};
