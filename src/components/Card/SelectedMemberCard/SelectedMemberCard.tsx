import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {DEFAULT_AVATAR} from '../../../constants/Images/Images';
import {UserInterface} from '../../../models/User/User';
import {Text} from '@ui-kitten/components';
import {RALEWAY_BOLD} from '../../../constants/Fonts/Fonts';

interface props {
  user: UserInterface;
}

const SelectedMemberCard = (props: props) => {
  return (
    <View style={styles.main}>
      <FastImage
        source={{
          uri: props.user.photoURL ? props.user.photoURL : DEFAULT_AVATAR,
        }}
        style={styles.img}
      />
      <Text style={styles.name}>
        {props.user.name ? props.user.name.split(' ')[0] : 'Robot'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 30,
  },
  name: {
    fontFamily: RALEWAY_BOLD,
  },
});

export default SelectedMemberCard;
