import React, {FC} from 'react';
import {Appearance} from 'react-native';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Text,
  IconRegistry,
  Layout,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as appTheme} from './src/themes/custom-theme.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './src/store/rootReducer';
import {updateTheme} from './src/store/theme/actionCreator/updateTheme';

const App = () => {
  const storeDispatch = useDispatch();
  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva[theme], ...appTheme}}>
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          level="1">
          <Text
            onPress={() =>
              storeDispatch(updateTheme(theme === 'light' ? 'dark' : 'light'))
            }>
            Welcome to UI Kitten
          </Text>
        </Layout>
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
