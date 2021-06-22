import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from '../MainTabNavigator/MainTabNavigator';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
