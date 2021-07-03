import {useStyleSheet, Text, Icon} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {RALEWAY_BOLD} from '../../../constants/Fonts/Fonts';

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
        <View style={[styles.textView, {flex: props.rightIcon ? 5 : 6}]}>
          <Text
            category="h5"
            style={[styles.centerText, {color: props.centerTextColor}]}>
            {props.centerText}
          </Text>
        </View>
      )}
      {props.rightIcon && (
        <View style={styles.rightIconView}>
          {props.rightLeftIcon && (
            <TouchableOpacity onPress={props.onPressRightLeftIcon}>
              <Icon
                name={props.rightLeftIcon}
                style={styles.rightIcon}
                fill={props.rightLeftIconColor}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={props.onRightPress}>
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
  },
  leftView: {
    flex: 1,
  },
  icon: {
    height: 30,
    width: 30,
    marginTop: 2,
  },
  centerText: {
    fontFamily: RALEWAY_BOLD,
  },
  textView: {
    alignItems: 'flex-start',
  },
  rightIcon: {
    height: 25,
    width: 25,
    marginTop: 10,
  },
  rightIconView: {
    flexDirection: 'row',
    flex: 1.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default BackHeader;
