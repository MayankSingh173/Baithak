import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  useTheme,
} from '@ui-kitten/components';
import NotificationScreen from '../../screens/NotificationScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/rootReducer';

interface props {
  navigation: any;
  state: any;
}

const PersonIcon = (props: any) => <Icon {...props} name="person-outline" />;

const BellIcon = (props: any) => <Icon {...props} name="bell-outline" />;

const EmailIcon = (props: any) => <Icon {...props} name="email-outline" />;

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
            : theme['color-basic-200'],
        borderTopColor: 'black',
      }}>
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
