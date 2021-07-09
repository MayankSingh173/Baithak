import React from 'react';
import {View, ActivityIndicator, Dimensions, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {useTheme} from '@ui-kitten/components';
import LottieView from 'lottie-react-native';

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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
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
