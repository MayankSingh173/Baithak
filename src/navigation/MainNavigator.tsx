import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import MainStackNavigator from './MainStackNavigator/MainStackNavigator';
import useAuth from '../hooks/auth/useAuth';
import {FAIL, SUCCESS} from '../constants/RemoteStates/remotestates';
import AuthStackNavigator from './AuthStackNavigator/AuthStackNavigator';
import PendingStackNavigator from './PendingStackNavigator/PendingStackNavigator';
import SplashScreen from 'react-native-splash-screen';
import useDynamicLink from '../hooks/User/useDynamicLinks';
import {navigationRef} from './RootNavigation/RootNavigation';

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const MainNavigator = () => {
  //check the status and get firebaseUser
  const {status, firebaseUser} = useAuth();

  //close splash screeen acc to status
  useEffect(() => {
    if (status === SUCCESS || status === FAIL) {
      SplashScreen.hide();
    }
  }, [status]);

  return (
    <NavigationContainer ref={navigationRef} theme={navigatorTheme}>
      {status === SUCCESS && firebaseUser.uid ? (
        <MainStackNavigator /> //Main App
      ) : status === FAIL || (status === SUCCESS && firebaseUser.uid !== '') ? (
        <AuthStackNavigator /> //Auth Stack
      ) : (
        <PendingStackNavigator /> //Edge case
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
