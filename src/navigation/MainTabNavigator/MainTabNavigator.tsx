import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  useTheme,
} from '@ui-kitten/components';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/rootReducer';
import MeetScreen from '../../screens/Meeting/MeetScreen/MeetScreen';
import {
  BellIcon,
  BellIconFill,
  ChatIcon,
  ChatIconFill,
  MeetIcon,
  MeetIconFill,
  ProfileIcon,
  ProfileIconFill,
} from '../../components/Icons/Icons';
import ChatHome from '../../screens/Chats/ChatHome/ChatHome';
import ActivityScreen from '../../screens/ActivityScreen/ActivityScreen';
import {
  ACTIVITY_HOME_SCREEN,
  CHAT_HOME_SCREEN,
  MEET_HOME_SCREEN,
  PROFILE_SCREEN,
} from '../../constants/Navigation/Navigation';

interface props {
  navigation: any;
  state: any;
}

const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabBar: FC<props> = ({navigation, state}) => {
  const appTheme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );
  const theme = useTheme();
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      style={{
        backgroundColor:
          appTheme === 'dark'
            ? theme['color-basic-1000']
            : theme['color-basic-100'],
        borderTopColor: 'black',
        borderTopWidth: 0.25,
        paddingTop: 10,
      }}>
      <BottomNavigationTab
        icon={state.index === 0 ? MeetIconFill : MeetIcon}
        title="Meet"
      />
      <BottomNavigationTab
        icon={state.index === 1 ? ChatIconFill : ChatIcon}
        title="Chat"
      />
      <BottomNavigationTab
        icon={state.index === 2 ? BellIconFill : BellIcon}
        title="Activity"
      />
      <BottomNavigationTab
        icon={state.index === 3 ? ProfileIconFill : ProfileIcon}
        title="Profile"
      />
    </BottomNavigation>
  );
};

const MainTabNavigator = () => (
  <Navigator
    tabBar={(props: any) => <BottomTabBar {...props} />}
    initialRouteName="Home">
    <Screen name={MEET_HOME_SCREEN} component={MeetScreen} />
    <Screen name={CHAT_HOME_SCREEN} component={ChatHome} />
    <Screen name={ACTIVITY_HOME_SCREEN} component={ActivityScreen} />
    <Screen name={PROFILE_SCREEN} component={ProfileScreen} />
  </Navigator>
);

export default MainTabNavigator;
