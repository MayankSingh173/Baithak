import {useTheme, useStyleSheet, Text, Icon} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';

interface props {
  leftIcon?: string;
  onLeftPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
  centerText?: string;
}

const BackHeader = (props: props) => {
  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );
  const appTheme = useTheme();
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={styles.main}>
      {props.leftIcon && (
        <TouchableOpacity onPress={props.onLeftPress} style={styles.leftView}>
          <Icon
            name={props.leftIcon}
            style={styles.icon}
            fill={theme === 'dark' ? 'white' : 'black'}
          />
        </TouchableOpacity>
      )}
      {props.centerText && (
        <View style={styles.textView}>
          <Text category="h5" style={styles.centerText}>
            {props.centerText}
          </Text>
        </View>
      )}
      {props.rightIcon && (
        <TouchableOpacity onPress={props.onRightPress} style={styles.rightView}>
          <Icon
            name={props.rightIcon}
            style={styles.icon}
            fill={theme === 'dark' ? 'white' : 'black'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const themedStyles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  leftView: {},
  rightView: {},
  icon: {
    height: 30,
    width: 30,
  },
  centerText: {},
  textView: {},
});

export default BackHeader;
