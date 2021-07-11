import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {UserInterface} from '../../../models/User/User';
import {Icon, Layout, Text} from '@ui-kitten/components';
import {DEFAULT_AVATAR} from '../../../constants/Images/Images';
import {RALEWAY_BOLD, RALEWAY_REGULAR} from '../../../constants/Fonts/Fonts';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';

interface props {
  user: UserInterface;
  onPressCross: (uid: string) => void;
}

const ParticipantCard = ({user, onPressCross}: props) => {
  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  return (
    <Layout level="2" style={styles.main}>
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
      <TouchableOpacity
        style={styles.iconView}
        onPress={() => onPressCross(user.uid)}>
        <Icon
          name="close-outline"
          fill={theme === 'dark' ? 'white' : 'black'}
          style={styles.icon}
        />
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    marginVertical: 7,
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
  iconView: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    height: 25,
    width: 25,
  },
});

export default ParticipantCard;
