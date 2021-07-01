import React from 'react';
import {Text, Layout, useTheme, Icon} from '@ui-kitten/components';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import ProfileHeader from '../../components/Headers/ProfileHeader/ProfileHeader';
import {useDispatch, useSelector} from 'react-redux';
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
import {useState} from 'react';
import Settings from '../../components/Modals/Settings/Settings';
import {updateFirebaseUserStatus} from '../../store/User/actionCreator/addFirebaseUser';
import {FAIL} from '../../constants/RemoteStates/remotestates';
import {generalErrorN} from '../../components/Alerts/GeneralError';
import auth from '@react-native-firebase/auth';

const ProfileScreen = (props: any) => {
  const {myProfile} = props.route.params;

  const [settingOpen, toggleSetting] = useState<boolean>(false);

  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );
  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const storeDispatch = useDispatch();

  const signOut = async () => {
    try {
      await auth().signOut();
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Great Success✌',
        text2: 'You have successfully logout ',
      });
      storeDispatch(updateFirebaseUserStatus(FAIL));
    } catch (err) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Something went wrong 😔',
        text2: 'Please try again!!',
      });
      storeDispatch(updateFirebaseUserStatus(FAIL));
      console.log('Error in log out', err);
    }
  };

  const onSignOut = async () => {
    generalErrorN(
      {
        title: 'Log Out',
        textMessage: 'Are you sure you want to logout',
        okText: 'Yes',
      },
      [
        {
          text: 'No',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: signOut,
        },
      ],
    );
  };

  const appTheme = useTheme();

  return (
    <Layout style={styles.main} level="1">
      <Settings
        modalVisible={settingOpen}
        onBackDropPress={() => toggleSetting(!settingOpen)}
      />
      <ScrollView>
        <View style={{flex: 1}}>
          <ProfileHeader
            myProfile={myProfile}
            onPressEdit={() => console.log('Edit')}
            onPressSetting={() => toggleSetting(!settingOpen)}
          />
        </View>
        <View style={[styles.imgView, {marginTop: !myProfile ? '17%' : 10}]}>
          <FastImage
            source={{
              uri: firebaseUser.photoURL
                ? firebaseUser.photoURL
                : DEFAULT_AVATAR,
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
                {firebaseUser.name ? firebaseUser.name : 'Robot'}
              </Text>
            </Text>
            <Text category="h6" style={styles.tagLine}>
              {firebaseUser.tagLine
                ? firebaseUser.tagLine
                : DEFAULT_USER_TAGLINE}
            </Text>
          </View>
        </View>
        <View style={styles.bioView}>
          <Text category="h5" style={styles.bioHeading}>
            Bio
          </Text>
          <Text style={styles.bio}>
            {firebaseUser.bio ? firebaseUser.bio : DEFAULT_BIO}
          </Text>
          <FullDivider style={{marginVertical: 15}} />
          <Text category="h5" style={styles.bioHeading}>
            Email
          </Text>
          <Text
            style={[styles.bio, {color: appTheme['color-info-400']}]}
            onPress={() => {
              Clipboard.setString(firebaseUser.email);
              Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Copied!',
                text2: `${firebaseUser.email}`,
              });
            }}>
            {firebaseUser.email}
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
