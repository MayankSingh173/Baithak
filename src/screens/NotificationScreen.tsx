import React from 'react';
import {View} from 'react-native';
import {Layout} from '@ui-kitten/components';
import GettingCall from './GettingCall';

const NotificationScreen = () => {
  return (
    <Layout
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      level="1">
      <GettingCall
        joinCall={() => console.log('Join Call')}
        hangUp={() => console.log('Hange UP')}
      />
    </Layout>
  );
};

export default NotificationScreen;
