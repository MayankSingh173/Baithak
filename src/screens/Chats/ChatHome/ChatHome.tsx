import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';

const ChatHome = () => {
  return (
    <Layout level="1" style={styles.main}>
      <Text>Chat Screen</Text>
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

export default ChatHome;
