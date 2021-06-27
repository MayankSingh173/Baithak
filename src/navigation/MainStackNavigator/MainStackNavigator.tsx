import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from '../MainTabNavigator/MainTabNavigator';
import {
  CREATE_MEET_SCREEN,
  JOIN_MEET_SCREEN,
  MAIN_TAB,
  VIDEO_STREAM,
} from '../../constants/Navigation/Navigation';
import CreateMeetScreen from '../../screens/Meeting/CreateMeetScreen/CreateMeetScreen';
import JoinMeetScreen from '../../screens/Meeting/JoinMeetScreen/JoinMeetScreen';
import VideoStream from '../../screens/Meeting/VideoStream/VideoStream';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={MAIN_TAB} component={MainTabNavigator} />
      <Stack.Screen name={CREATE_MEET_SCREEN} component={CreateMeetScreen} />
      <Stack.Screen name={JOIN_MEET_SCREEN} component={JoinMeetScreen} />
      <Stack.Screen name={VIDEO_STREAM} component={VideoStream} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
