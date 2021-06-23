import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from './Button';

interface props {
  joinCall: () => void;
  hangUp: () => void;
}
const GettingCall = (props: props) => {
  return (
    <View style={styles.main}>
      <View style={styles.buttonView}>
        <Button
          onPress={props.hangUp}
          backgroundColor="red"
          iconName="star"
          style={{margin: 5}}
        />
        <Button
          onPress={props.joinCall}
          backgroundColor="green"
          iconName="heart"
          style={{margin: 5}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default GettingCall;
