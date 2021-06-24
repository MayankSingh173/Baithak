import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../screens/ProfileScreen';

const Stack = createStackNavigator();

const PendingStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default PendingStackNavigator;
