import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const ActivityScreen = () => {
  return (
    <Layout level="1" style={styles.main}>
      <Text>Activity Screen</Text>
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

export default ActivityScreen;
