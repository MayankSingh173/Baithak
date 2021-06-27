import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';

const VideoStream = (props: any) => {
  const {token, meetDetails} = props.route.params;
  console.log(token);
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout level="1" style={styles.main}>
      <Text>Video Strem</Text>
    </Layout>
  );
};

const themedStyles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoStream;
