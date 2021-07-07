import React from 'react';
import {StyleSheet, View, TouchableOpacity, Linking} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {INSTA_LOGO} from '../../../constants/Images/Images';
import {UserInterface} from '../../../models/User/User';
import {RootState} from '../../../store/rootReducer';
import {
  FacebookIcon,
  GithubIcon,
  LinkedInIcon,
  TwitterIcon,
} from '../../Icons/Icons';

interface props {
  firebaseUser: UserInterface;
}

interface socialDataType {
  type: 'instagram' | 'facebook' | 'linkedIn' | 'github' | 'twitter';
  link?: string;
}

const SocialProfile = (props: props) => {
  const data: socialDataType[] = [
    {
      type: 'instagram',
      link: props.firebaseUser.instagram,
    },
    {
      type: 'facebook',
      link: props.firebaseUser.facebook,
    },
    {
      type: 'linkedIn',
      link: props.firebaseUser.linkedIn,
    },
    {
      type: 'github',
      link: props.firebaseUser.github,
    },
    {
      type: 'twitter',
      link: props.firebaseUser.twitter,
    },
  ];

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  return (
    <View style={styles.main}>
      {data.map((data, index) => {
        return data.link ? (
          <View key={index}>
            {data.type === 'instagram' ? (
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => Linking.openURL(data.link ? data.link : '')}>
                <FastImage source={{uri: INSTA_LOGO}} style={styles.icon} />
              </TouchableOpacity>
            ) : data.type === 'facebook' ? (
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => Linking.openURL(data.link ? data.link : '')}>
                {FacebookIcon(styles.icon)}
              </TouchableOpacity>
            ) : data.type === 'linkedIn' ? (
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => Linking.openURL(data.link ? data.link : '')}>
                {LinkedInIcon(styles.icon)}
              </TouchableOpacity>
            ) : data.type === 'twitter' ? (
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => Linking.openURL(data.link ? data.link : '')}>
                {TwitterIcon(styles.icon)}
              </TouchableOpacity>
            ) : data.type === 'github' ? (
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => Linking.openURL(data.link ? data.link : '')}>
                {GithubIcon(
                  styles.icon,
                  theme === 'light' ? 'black' : '#fafafa',
                )}
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconView: {
    margin: 10,
  },
  icon: {
    height: 30,
    width: 30,
  },
});

export default SocialProfile;
