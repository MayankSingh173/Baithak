import React, {FC} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import MainStackNavigator from './MainStackNavigator/MainStackNavigator';

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

const MainNavigator: FC = () => {
  return (
    <NavigationContainer theme={navigatorTheme}>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;
