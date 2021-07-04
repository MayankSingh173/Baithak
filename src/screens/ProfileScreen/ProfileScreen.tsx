import React from 'react';
import {Text, Layout, useTheme, Icon} from '@ui-kitten/components';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ProfileHeader from '../../components/Headers/ProfileHeader/ProfileHeader';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/rootReducer';
import FastImage from 'react-native-fast-image';
import {DEFAULT_AVATAR} from '../../constants/Images/Images';
import {
  RALEWAY_BOLD,
  RALEWAY_EXTRA_BOLD,
  RALEWAY_MEDIUM,
  RALEWAY_REGULAR,
} from '../../constants/Fonts/Fonts';
import {DEFAULT_BIO, DEFAULT_USER_TAGLINE} from '../../constants/User/User';
import FullDivider from '../../components/Divider/FullDivider';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';
import Settings from '../../components/Modals/Settings/Settings';
import {EDIT_PROFILE_SCREEN} from '../../constants/Navigation/Navigation';
import useGetUserForProfile from '../../hooks/User/useGetUserForProfile';

const ProfileScreen = (props: any) => {
  const {myProfile, uid} = props.route.params;

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const {loading, user, onSignOut, settingOpen, onClickSettings} =
    useGetUserForProfile(uid);

  const appTheme = useTheme();

  return loading ? (
    <Layout
      style={[styles.main, {justifyContent: 'center', alignItems: 'center'}]}
      level="1">
      <ActivityIndicator
        size="large"
        color={appTheme['color-primary-default']}
      />
    </Layout>
  ) : (
    <Layout style={styles.main} level="1">
      <Settings
        uid={user.uid}
        modalVisible={settingOpen}
        onBackDropPress={onClickSettings}
      />
      <ScrollView>
        <View style={{flex: 1}}>
          <ProfileHeader
            myProfile={myProfile}
            onPressEdit={() => props.navigation.navigate(EDIT_PROFILE_SCREEN)}
            onPressSetting={onClickSettings}
          />
        </View>
        <View style={[styles.imgView, {marginTop: !myProfile ? '17%' : 10}]}>
          <FastImage
            source={{
              uri: user.photoURL ? user.photoURL : DEFAULT_AVATAR,
            }}
            style={styles.image}
          />
          <View style={styles.nameView}>
            <Text category="h6" style={styles.name}>
              Hi, I'm{' '}
              <Text
                category="h5"
                style={{
                  color: appTheme['color-primary-default'],
                  fontFamily: RALEWAY_EXTRA_BOLD,
                }}>
                {user.name ? user.name : 'Robot'}
              </Text>
            </Text>
            <Text category="h6" style={styles.tagLine}>
              {user.tagLine ? user.tagLine : DEFAULT_USER_TAGLINE}
            </Text>
          </View>
        </View>
        <View style={styles.bioView}>
          <Text category="h5" style={styles.bioHeading}>
            Bio
          </Text>
          <Text style={styles.bio}>{user.bio ? user.bio : DEFAULT_BIO}</Text>
          <FullDivider style={{marginVertical: 15}} />
          <Text category="h5" style={styles.bioHeading}>
            Email
          </Text>
          <Text
            style={[styles.bio, {color: appTheme['color-info-400']}]}
            onPress={() => {
              Clipboard.setString(user.email);
              Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Copied!',
                text2: `${user.email}`,
              });
            }}>
            {user.email}
          </Text>
          {myProfile && <FullDivider style={{marginVertical: 15}} />}
          {myProfile && (
            <TouchableOpacity style={styles.inviteView}>
              <Icon
                name="share-outline"
                fill={theme === 'dark' ? 'white' : 'black'}
                style={styles.icon}
              />
              <Text category="s1" style={styles.invite}>
                Invite you friends
              </Text>
            </TouchableOpacity>
          )}
          {myProfile && (
            <TouchableOpacity
              style={[styles.inviteView, {marginTop: 20}]}
              onPress={onSignOut}>
              <Icon
                name="log-out-outline"
                fill={theme === 'dark' ? 'white' : 'black'}
                style={styles.icon}
              />
              <Text
                category="s1"
                style={[styles.invite, {color: appTheme['color-danger-500']}]}>
                Log Out
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
  },
  imgView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 70,
  },
  nameView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  name: {
    fontFamily: RALEWAY_BOLD,
  },
  tagLine: {
    fontFamily: RALEWAY_MEDIUM,
    marginTop: 10,
    color: 'grey',
  },
  bioHeading: {
    fontFamily: RALEWAY_BOLD,
  },
  bioView: {
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
  bio: {
    fontFamily: RALEWAY_REGULAR,
    marginTop: 10,
  },
  invite: {
    fontFamily: RALEWAY_EXTRA_BOLD,
  },
  inviteView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
});

export default ProfileScreen;
