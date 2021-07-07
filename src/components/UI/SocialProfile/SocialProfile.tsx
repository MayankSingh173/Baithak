import React from 'react';
import {StyleSheet, View, TouchableOpacity, Linking} from 'react-native';
import {UserInterface} from '../../../models/User/User';
import {
  FacebookIcon,
  GithubIcon,
  InstaIcon,
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

  return (
    <View style={styles.main}>
      {data.map((data, index) => {
        return data.link ? (
          <View>
            {data.type === 'instagram' ? (
              <TouchableOpacity
                key={index}
                style={styles.iconView}
                onPress={() => Linking.openURL(data.link ? data.link : '')}>
                <InstaIcon size={30} />
              </TouchableOpacity>
            ) : data.type === 'facebook' ? (
              <TouchableOpacity
                key={index}
                style={styles.iconView}
                onPress={() => Linking.openURL(data.link ? data.link : '')}>
                {FacebookIcon(styles.icon)}
              </TouchableOpacity>
            ) : data.type === 'linkedIn' ? (
              <TouchableOpacity
                key={index}
                style={styles.iconView}
                onPress={() => Linking.openURL(data.link ? data.link : '')}>
                {LinkedInIcon(styles.icon)}
              </TouchableOpacity>
            ) : data.type === 'twitter' ? (
              <TouchableOpacity
                key={index}
                style={styles.iconView}
                onPress={() => Linking.openURL(data.link ? data.link : '')}>
                {TwitterIcon(styles.icon)}
              </TouchableOpacity>
            ) : data.type === 'github' ? (
              <TouchableOpacity
                key={index}
                style={styles.iconView}
                onPress={() => Linking.openURL(data.link ? data.link : '')}>
                {GithubIcon(styles.icon)}
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
