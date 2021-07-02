import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from '../MainTabNavigator/MainTabNavigator';
import {
  CREATE_MEET_SCREEN,
  EDIT_PROFILE_SCREEN,
  JOIN_MEET_SCREEN,
  MAIN_TAB,
  REMOTE_USER_SEARCH_SCREEN,
  USER_SEARCH_SCREEN,
  VIDEO_STREAM,
} from '../../constants/Navigation/Navigation';
import CreateMeetScreen from '../../screens/Meeting/CreateMeetScreen/CreateMeetScreen';
import JoinMeetScreen from '../../screens/Meeting/JoinMeetScreen/JoinMeetScreen';
import VideoStream from '../../screens/Meeting/VideoStream/VideoStream';
import EditProfileScreen from '../../screens/ProfileScreen/EditProfileScreen';
import UserSearchScreen from '../../screens/Search/UserSearch/UserSearchScreen';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import RemoteProfileScreen from '../../screens/ProfileScreen/RemoteProfileScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={MAIN_TAB} component={MainTabNavigator} />
      <Stack.Screen name={CREATE_MEET_SCREEN} component={CreateMeetScreen} />
      <Stack.Screen name={JOIN_MEET_SCREEN} component={JoinMeetScreen} />
      <Stack.Screen name={VIDEO_STREAM} component={VideoStream} />
      <Stack.Screen name={EDIT_PROFILE_SCREEN} component={EditProfileScreen} />
      <Stack.Screen name={USER_SEARCH_SCREEN} component={UserSearchScreen} />
      <Stack.Screen
        name={REMOTE_USER_SEARCH_SCREEN}
        component={RemoteProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
