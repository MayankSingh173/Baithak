import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
} from '@ui-kitten/components';
import HomeScreen from '../../screens/HomeScreen';
import NotificationScreen from '../../screens/NotificationScreen';
import ProfileScreen from '../../screens/ProfileScreen';

interface props {
  navigation: any;
  state: any;
}

const PersonIcon = (props: any) => <Icon {...props} name="person-outline" />;

const BellIcon = (props: any) => <Icon {...props} name="bell-outline" />;

const EmailIcon = (props: any) => <Icon {...props} name="email-outline" />;

const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabBar: FC<props> = ({navigation, state}) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={EmailIcon} title="Home" />
      <BottomNavigationTab icon={PersonIcon} title="Profile" />
      <BottomNavigationTab icon={BellIcon} title="Activity" />
    </BottomNavigation>
  );
};

const MainTabNavigator = () => (
  <Navigator
    tabBar={(props: any) => <BottomTabBar {...props} />}
    initialRouteName="Home">
    <Screen name="Home" component={ProfileScreen} />
    <Screen name="Profile" component={ProfileScreen} />
    <Screen name="Activity" component={NotificationScreen} />
  </Navigator>
);

export default MainTabNavigator;
