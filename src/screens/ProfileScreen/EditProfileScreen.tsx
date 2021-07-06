import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';

const EditProfileScreen = () => {
  return (
    <Layout style={styles.main}>
      <Text>Edit Screen</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditProfileScreen;
