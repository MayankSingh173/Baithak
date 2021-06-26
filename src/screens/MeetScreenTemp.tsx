import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {MediaStream, RTCView} from 'react-native-webrtc';
import Button from './Button';

interface props {
  hangUp: () => void;
  localStream?: MediaStream | null;
  remoteStream?: MediaStream | null;
}

const ButtonContainer = (props: props) => {
  return (
    <View style={styles.bContainer}>
      <Button backgroundColor="red" onPress={props.hangUp} iconName="heart" />
    </View>
  );
};

const MeetScreenTemp = (props: props) => {
  //On call we will display the local stream
  if (props.localStream && !props.remoteStream) {
    return (
      <Layout level="1" style={styles.container}>
        <RTCView
          streamURL={props.localStream.toURL()}
          style={styles.video}
          objectFit="cover"
        />
        <Button
          backgroundColor="red"
          iconName="star"
          onPress={props.hangUp}
          style={{bottom: 30}}
        />
      </Layout>
    );
  }

  //once the call is connected will display both local and remote
  if (props.localStream && props.remoteStream) {
    return (
      <Layout
        level="1"
        style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <RTCView
          streamURL={props.remoteStream.toURL()}
          style={styles.video}
          objectFit="cover"
        />
        <RTCView
          streamURL={props.localStream.toURL()}
          style={styles.videoLocal}
          objectFit="cover"
        />
        <Button
          backgroundColor="red"
          iconName="star"
          onPress={props.hangUp}
          style={{bottom: 30}}
        />
      </Layout>
    );
  }

  return <ButtonContainer hangUp={props.hangUp} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bContainer: {
    flexDirection: 'row',
    bottom: 30,
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  videoLocal: {
    position: 'absolute',
    height: 150,
    width: 100,
    top: 0,
    left: 20,
    elevation: 10,
  },
});

export default MeetScreenTemp;
