import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import LottieView from 'lottie-react-native';
import {screenHeight} from '../../../constants/screen/screenInfo';
import {RALEWAY_BOLD, RALEWAY_MEDIUM} from '../../../constants/Fonts/Fonts';

const NoChatsHome = () => {
  return (
    <View style={styles.main}>
      <View style={styles.imageView}>
        <LottieView
          source={require('../../../assets/Animations/chat.json')}
          autoPlay
          loop
          style={styles.image}
        />
      </View>
      <Text category="h6" style={styles.chatHeading}>
        Chat with your friends
      </Text>
      <Text category="s1" style={styles.noMessg}>
        No messages as of Now
      </Text>
    </View>
  );
};

export default NoChatsHome;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  image: {
    height: screenHeight - 500,
  },
  imageView: {
    width: '100%',
    alignItems: 'center',
  },
  chatHeading: {
    fontFamily: RALEWAY_BOLD,
    marginTop: 20,
  },
  noMessg: {
    fontFamily: RALEWAY_MEDIUM,
    color: 'grey',
    marginTop: 5,
  },
});
