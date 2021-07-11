import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {onboardingScreens} from '../../constants/onboarding/onboarding';
import {ONBOARDING_SCREEN_NAME} from '../../constants/Navigation/Navigation';
import OnboardingScreen from '../../screens/Onboarding/OnboardingScreen';

const Stack = createStackNavigator();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator>
      {onboardingScreens.map((item, index) => (
        <Stack.Screen
          key={item.key}
          name={`${ONBOARDING_SCREEN_NAME}-${index}`}
          options={{
            headerShown: false,
          }}
          initialParams={{
            index: index, // day heading
          }}
          component={OnboardingScreen}
        />
      ))}
    </Stack.Navigator>
  );
}
