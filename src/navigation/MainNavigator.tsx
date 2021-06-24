import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import MainStackNavigator from './MainStackNavigator/MainStackNavigator';
import useAuth from '../hooks/User/useAuth';
import {FAIL, SUCCESS} from '../constants/RemoteStates/remotestates';
import AuthStackNavigator from './AuthStackNavigator/AuthStackNavigator/AuthStackNavigator';
import PendingStackNavigator from './PendingStackNavigator/PendingStackNavigator';

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

const MainNavigator = () => {
  //check the status and get firebaseUser
  const {status, firebaseUser} = useAuth();
  console.log(status);
  return (
    <NavigationContainer theme={navigatorTheme}>
      {status === SUCCESS && firebaseUser.uid ? (
        <MainStackNavigator /> //Main App
      ) : status === FAIL || (status === SUCCESS && !firebaseUser.uid) ? (
        <AuthStackNavigator /> //Auth Stack
      ) : (
        <PendingStackNavigator /> //Edge case
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
