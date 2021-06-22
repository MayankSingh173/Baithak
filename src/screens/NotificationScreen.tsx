import React from 'react';
import {View} from 'react-native';
import {Text, Layout} from '@ui-kitten/components';

const NotificationScreen = () => {
  return (
    <Layout
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      level="1">
      <Text>Notification Screen</Text>
    </Layout>
  );
};

export default NotificationScreen;
