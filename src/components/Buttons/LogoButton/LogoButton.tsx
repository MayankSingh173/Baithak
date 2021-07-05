import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from '@ui-kitten/components';
import {RALEWAY_BOLD} from '../../../constants/Fonts/Fonts';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';
import FastImage from 'react-native-fast-image';

const LogoButton = (props: any) => {
  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );
  return (
    <View {...props}>
      <TouchableOpacity
        style={[
          styles.main,
          {borderColor: theme === 'dark' ? '#fff' : 'black'},
        ]}
        onPress={props.onPress}>
        <View style={styles.left}>
          <FastImage
            style={{
              width: props.buttonType == 'facebook' ? 30 : 25,
              height: props.buttonType == 'facebook' ? 30 : 25,
              marginLeft: props.buttonType == 'facebook' ? 15 : 0,
              marginVertical: props.buttonType == 'facebook' ? -3 : 0,
            }}
            source={props.src}
          />
        </View>
        <View style={styles.center}>
          <Text style={styles.text} category="s1">
            {props.title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: 'center',
  },
  text: {
    fontFamily: RALEWAY_BOLD,
  },
  left: {
    alignSelf: 'center',
    marginRight: 20,
  },
  center: {
    justifyContent: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});

export default LogoButton;
