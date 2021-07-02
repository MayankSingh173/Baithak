import {useTheme, useStyleSheet, Text, Icon} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {RALEWAY_BOLD} from '../../../constants/Fonts/Fonts';
import {RootState} from '../../../store/rootReducer';

interface props {
  leftIcon?: string;
  onLeftPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
  centerText?: string;
  centerTextColor?: string;
  leftIconColor?: string;
  rightIconColor?: string;
  rightLeftIcon?: string;
  rightLeftIconColor?: string;
  onPressRightLeftIcon?: () => void;
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
            fill={props.leftIconColor}
          />
        </TouchableOpacity>
      )}
      {props.centerText && (
        <View
          style={[styles.textView, {width: props.rightIcon ? '75%' : '85%'}]}>
          <Text
            category="h5"
            style={[styles.centerText, {color: props.centerTextColor}]}>
            {props.centerText}
          </Text>
        </View>
      )}
      {props.rightIcon && (
        <View style={{flexDirection: 'row'}}>
          {props.rightLeftIcon && (
            <TouchableOpacity
              onPress={props.onPressRightLeftIcon}
              style={[styles.rightView, {marginRight: 10}]}>
              <Icon
                name={props.rightLeftIcon}
                style={styles.rightIcon}
                fill={props.rightLeftIconColor}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={props.onRightPress}
            style={styles.rightView}>
            <Icon
              name={props.rightIcon}
              style={styles.rightIcon}
              fill={props.rightIconColor}
            />
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    position: 'relative',
  },
  leftView: {},
  rightView: {},
  icon: {
    height: 30,
    width: 30,
    marginTop: 2,
  },
  centerText: {
    fontFamily: RALEWAY_BOLD,
  },
  textView: {
    width: '75%',
    alignItems: 'flex-start',
  },
  rightIcon: {
    height: 25,
    width: 25,
    marginTop: 10,
  },
});

export default BackHeader;
