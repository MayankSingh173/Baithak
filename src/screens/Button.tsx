import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from '@ui-kitten/components';

interface props {
  onPress?: any;
  iconName: string;
  backgroundColor: string;
  style?: any;
}

const Button = (props: props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          {backgroundColor: props.backgroundColor},
          props.style,
          styles.button,
        ]}>
        <Icon style={styles.icon} fill="#ffff" name={props.iconName} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default Button;
