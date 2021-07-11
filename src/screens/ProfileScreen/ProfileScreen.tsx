import React from 'react';
import {Text, Layout, useTheme, Icon, Button} from '@ui-kitten/components';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
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
import {
  DEFAULT_BIO,
  DEFAULT_USER_NAME,
  DEFAULT_USER_TAGLINE,
} from '../../constants/User/User';
import FullDivider from '../../components/Divider/FullDivider';
import Settings from '../../components/Modals/Settings/Settings';
import {
  EDIT_PROFILE_SCREEN,
  GROUP_CHAT_SCREEN,
} from '../../constants/Navigation/Navigation';
import useGetUserForProfile from '../../hooks/User/useGetUserForProfile';
import SocialProfile from '../../components/UI/SocialProfile/SocialProfile';
import {createDM} from '../../utils/Messages/Group/onCreateGroup';
import Toast from 'react-native-toast-message';
import BackHeader from '../../components/Headers/BackHeader/BackHeader';
import SelectImage from '../../components/Modals/SelectImage/SelectImage';

const ProfileScreen = (props: any) => {
  //is myProfile is false is means we are seeing others profile screen
  const {myProfile, uid} = props.route.params;

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const {
    loading,
    user,
    onSignOut,
    settingOpen,
    onClickSettings,
    setGoingToMessage,
    selectImage,
    onCloseSelectImage,
    onCaptureImage,
    onSelectFromLibrary,
  } = useGetUserForProfile(uid);

  const appTheme = useTheme();

  const onMessagePress = async () => {
    try {
      setGoingToMessage(true);
      if (user) {
        const selectedMemeber = [firebaseUser, user];
        if (selectedMemeber) {
          const new_group = await createDM(selectedMemeber, firebaseUser);
          props.navigation.navigate(GROUP_CHAT_SCREEN, {group: new_group});
        }
      }
    } catch (error) {
      console.log('Error in Pressing Message Button', error);
      setGoingToMessage(false);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Something went wrong 😔',
        text2: 'Please try again!!',
      });
    }
  };

  if (!user || loading) {
    return (
      <Layout
        style={[styles.main, {justifyContent: 'center', alignItems: 'center'}]}
        level="1">
        <ActivityIndicator
          size="large"
          color={appTheme['color-primary-default']}
        />
      </Layout>
    );
  }

  return (
    <Layout style={styles.main} level="1">
      <SelectImage
        modalVisible={selectImage}
        onBackDropPress={onCloseSelectImage}
        onCaptureImage={onCaptureImage}
        onSelectFromGallery={onSelectFromLibrary}
      />
      <Settings modalVisible={settingOpen} onBackDropPress={onClickSettings} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {myProfile ? (
          <View style={{flex: 1}}>
            <ProfileHeader
              myProfile={myProfile}
              onPressEdit={() => props.navigation.navigate(EDIT_PROFILE_SCREEN)}
              onPressSetting={onClickSettings}
            />
          </View>
        ) : (
          <View style={{flex: 1, padding: 10, paddingBottom: 0}}>
            <BackHeader
              leftIcon="arrow-back-outline"
              leftIconColor={theme === 'dark' ? 'white' : 'black'}
              onLeftPress={() => props.navigation.goBack()}
            />
          </View>
        )}
        <View style={[styles.imgView, {marginTop: !myProfile ? '10%' : 10}]}>
          <FastImage
            source={{
              uri: user?.photoURL ? user.photoURL : DEFAULT_AVATAR,
            }}
            style={[
              styles.image,
              {borderColor: theme === 'dark' ? 'white' : 'black'},
            ]}
          />
          {myProfile && (
            <TouchableOpacity
              onPress={onCloseSelectImage}
              style={[styles.iconView, {backgroundColor: 'white'}]}>
              <Icon
                name="camera-outline"
                style={styles.editIcon}
                fill={appTheme['color-primary-default']}
              />
            </TouchableOpacity>
          )}
          <View style={styles.nameView}>
            <Text category="h6" style={styles.name}>
              Hi, I'm{' '}
              <Text
                category="h5"
                style={{
                  color: appTheme['color-primary-default'],
                  fontFamily: RALEWAY_EXTRA_BOLD,
                }}>
                {user?.name ? user.name : DEFAULT_USER_NAME}
              </Text>
            </Text>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Text style={styles.tagLine}>
                {user?.tagLine ? user.tagLine : DEFAULT_USER_TAGLINE}
              </Text>
            </View>
          </View>
        </View>
        {user && <SocialProfile firebaseUser={user} />}
        <FullDivider />
        <View style={styles.bioView}>
          <Text category="h5" style={styles.bioHeading}>
            Bio
          </Text>
          <Text style={styles.bio}>{user?.bio ? user.bio : DEFAULT_BIO}</Text>
          <FullDivider style={{marginVertical: 15}} />
          <Text category="h5" style={styles.bioHeading}>
            Email
          </Text>
          <Text
            style={[styles.bio, {color: appTheme['color-info-400']}]}
            onPress={() => {
              !myProfile && Linking.openURL(`mailto:${user?.email}`);
            }}>
            {user?.email}
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
            <TouchableOpacity style={[styles.inviteView, {marginTop: 20}]}>
              <Icon
                name="edit-2-outline"
                fill={theme === 'dark' ? 'white' : 'black'}
                style={styles.icon}
              />
              <Text category="s1" style={styles.invite}>
                Any Feedback
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
          {!myProfile && (
            <Button
              style={styles.button}
              appearance="filled"
              onPress={onMessagePress}>
              Message
            </Button>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 70,
    borderWidth: 2,
  },
  nameView: {
    marginTop: 20,
    paddingHorizontal: 14,
    width: '100%',
    alignItems: 'center',
  },
  name: {
    fontFamily: RALEWAY_BOLD,
    alignSelf: 'center',
    flex: 1,
  },
  tagLine: {
    fontFamily: RALEWAY_MEDIUM,
    marginTop: 10,
    color: 'grey',
    fontSize: 17,
  },
  bioHeading: {
    fontFamily: RALEWAY_BOLD,
  },
  bioView: {
    flex: 1,
    padding: 10,
    marginTop: 0,
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
  button: {
    marginTop: 20,
  },
  iconView: {
    padding: 3,
    borderRadius: 30,
    marginLeft: 50,
    marginTop: -25,
  },
  editIcon: {
    height: 25,
    width: 25,
  },
});

export default ProfileScreen;
