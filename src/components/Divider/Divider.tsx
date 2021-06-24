import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/rootReducer';

const Divider = (props: any) => {
  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );
  return (
    <View style={[styles.main, props.style]} {...props}>
      <View
        style={[
          styles.hairline,
          {borderColor: theme === 'dark' ? 'grey' : 'black'},
        ]}
      />
      <View style={styles.centerHolder}>
        <Text>{props.centerText}</Text>
      </View>
      <View
        style={[
          styles.hairline,
          {borderColor: theme === 'dark' ? 'grey' : 'black'},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  centerHolder: {
    marginLeft: 8,
    marginRight: 8,
  },
  hairline: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Divider;
