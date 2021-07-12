import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Text, useTheme} from '@ui-kitten/components';
import LottieView from 'lottie-react-native';
import {RALEWAY_BOLD} from '../../../constants/Fonts/Fonts';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const ModalActivityIndicator = (props: any) => {
  const theme = useTheme();
  return (
    <Modal
      backdropOpacity={props.backdropOpacity ? props.backdropOpacity : 0.7}
      isVisible={props.modalVisible}
      coverScreen={props.coverScreen}
      hasBackdrop={props.hasNoBackDrop ? false : true}
      style={styles.modal}
      animationIn={props.animationIn ? props.animationIn : 'fadeIn'}
      animationOut={props.animationIn ? props.animationIn : 'fadeOut'}
      useNativeDriver>
      <View style={styles.main}>
        <LottieView
          source={require('../../../assets/Animations/loading.json')}
          autoPlay
          loop
          style={styles.image}
        />
        <Text
          category="h6"
          style={{fontFamily: RALEWAY_BOLD, color: 'white', marginTop: -50}}>
          Loading...
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: -50,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 200,
  },
});

export default ModalActivityIndicator;
