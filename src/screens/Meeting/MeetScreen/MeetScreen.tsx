import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const MeetScreen = () => {
  return (
    <Layout level="1" style={styles.main}>
      <Text>Meet Screen</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MeetScreen;
