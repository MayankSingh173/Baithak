import React, {FC} from 'react';
import {View, Appearance} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Text, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {default as appTheme} from './src/themes/custom-theme.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const theme = {
  ...(Appearance.getColorScheme() === 'dark' ? eva.dark : eva.light),
  ...appTheme,
};

const App: FC = () => {
  return (
    <React.Fragment>
      <SafeAreaProvider>
        <ApplicationProvider {...eva} theme={theme}>
          <IconRegistry icons={EvaIconsPack} />
          <View>
            <Text>Hello World!!</Text>
          </View>
        </ApplicationProvider>
      </SafeAreaProvider>
    </React.Fragment>
  );
};

export default App;
