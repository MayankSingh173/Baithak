import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {UserInterface} from '../../../models/User/User';
import {Avatar, Text} from '@ui-kitten/components';
import {DEFAULT_AVATAR} from '../../../constants/Images/Images';
import {RALEWAY_BOLD, RALEWAY_REGULAR} from '../../../constants/Fonts/Fonts';
import FastImage from 'react-native-fast-image';

interface props {
  user: UserInterface;
  onPress: () => void;
}

const UserSerchCard = ({user, onPress}: props) => {
  return (
    <TouchableOpacity style={styles.main} onPress={onPress}>
      <View style={styles.imgView}>
        <FastImage
          source={{uri: user.photoURL ? user.photoURL : DEFAULT_AVATAR}}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{user.name ? user.name : 'Robot'}</Text>
        <Text style={styles.tagLine}>
          {user.tagLine ? user.tagLine : 'Baithak user'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    flex: 4,
    justifyContent: 'center',
    paddingHorizontal: 10,
    //  borderBottomWidth: 0.3,
    //  borderColor: 'grey',
    //  paddingBottom: 15,
  },
  name: {
    fontFamily: RALEWAY_BOLD,
  },
  tagLine: {
    fontFamily: RALEWAY_REGULAR,
    color: 'grey',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});

export default UserSerchCard;
