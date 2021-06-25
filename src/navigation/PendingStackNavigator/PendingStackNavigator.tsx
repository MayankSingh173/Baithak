import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PendingScreen from '../../screens/Auth/PendingScreen/PendingScreen';
import {PENDING_STACK_SCREEN} from '../../constants/Navigation/Navigation';

const Stack = createStackNavigator();

const PendingStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={PENDING_STACK_SCREEN}
        component={PendingScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default PendingStackNavigator;
