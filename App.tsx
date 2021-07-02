import React from 'react';
import {View} from 'react-native';
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

LogBox.ignoreAllLogs();

const App = () => {
  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{...(theme && eva[theme]), ...appTheme}}>
        <MainNavigator />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ApplicationProvider>
    </React.Fragment>
  );
};

export default () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SafeAreaProvider>
  );
};
