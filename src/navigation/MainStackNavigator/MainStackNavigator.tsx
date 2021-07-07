import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from '../MainTabNavigator/MainTabNavigator';
import {
  CREATE_GROUP_SCREEN,
  CREATE_MEET_SCREEN,
  EDIT_PROFILE_SCREEN,
  GROUP_CHAT_SCREEN,
  JOIN_MEET_SCREEN,
  MAIN_TAB,
  REMOTE_USER_PROFILE_SCREEN,
  USER_ADD_SEARCH_SCREEN,
  USER_SEARCH_SCREEN,
  VIDEO_STREAM,
} from '../../constants/Navigation/Navigation';
import CreateMeetScreen from '../../screens/Meeting/CreateMeetScreen/CreateMeetScreen';
import JoinMeetScreen from '../../screens/Meeting/JoinMeetScreen/JoinMeetScreen';
import VideoStream from '../../screens/Meeting/VideoStream/VideoStream';
import EditProfileScreen from '../../screens/ProfileScreen/EditProfileScreen';
import UserSearchScreen from '../../screens/Search/UserSearch/UserSearchScreen';
import UserAddSearchScreen from '../../screens/Search/UserAddSearchScreen/UserAddSearchScreen';
import CreateGroupScreen from '../../screens/CreateGroup/CreateGroupScreen';
import GroupChatsScreen from '../../screens/Chats/GroupChatsScreen/GroupChatsScreen';
import useGetMessagePerm from '../../hooks/Notifications/useGetMessagePerm';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  //Hook for saving tokens to firebase user
  useGetMessagePerm();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={MAIN_TAB} component={MainTabNavigator} />
      <Stack.Screen name={CREATE_MEET_SCREEN} component={CreateMeetScreen} />
      <Stack.Screen name={JOIN_MEET_SCREEN} component={JoinMeetScreen} />
      <Stack.Screen name={VIDEO_STREAM} component={VideoStream} />
      <Stack.Screen name={EDIT_PROFILE_SCREEN} component={EditProfileScreen} />
      <Stack.Screen name={USER_SEARCH_SCREEN} component={UserSearchScreen} />
      <Stack.Screen
        name={REMOTE_USER_PROFILE_SCREEN}
        component={ProfileScreen}
      />
      <Stack.Screen
        name={USER_ADD_SEARCH_SCREEN}
        component={UserAddSearchScreen}
      />
      <Stack.Screen name={CREATE_GROUP_SCREEN} component={CreateGroupScreen} />
      <Stack.Screen name={GROUP_CHAT_SCREEN} component={GroupChatsScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
