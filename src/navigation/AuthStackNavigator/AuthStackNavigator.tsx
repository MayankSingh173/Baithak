import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  FORGOT_PASSWORD_SCREEN,
  SIGN_IN_SCREEN,
  SIGN_UP_SCREEN,
} from '../../constants/Navigation/Navigation';
import SignIn from '../../screens/Auth/SignIn/SignIn';
import SignUp from '../../screens/Auth/SignUp/SignUp';
import ForgotPassword from '../../screens/Auth/ForgotPassword/ForgotPassword';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={SIGN_IN_SCREEN} component={SignIn} />
      <Stack.Screen name={SIGN_UP_SCREEN} component={SignUp} />
      <Stack.Screen name={FORGOT_PASSWORD_SCREEN} component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
