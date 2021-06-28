import {Text, useStyleSheet, Layout} from '@ui-kitten/components';
import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import {RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora';
import useStartMeeting from '../../../hooks/Meeting/useStartMeeting';
import ModalActivityIndicator from '../../../components/Modals/ModalActivityIndicator/ModalActivityIndicator';
import {VideoStreamParams} from '../../../models/Meeting/CreateMeeting/interface';

const APP_ID = '63ad64d4cbcb4222b288c85cfb41be47';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const VideoStream = (props: any) => {
  const meetConfig: VideoStreamParams = props.route.params;

  const {joinSucceed, peerIds, startCall, endCall, modalVisible, engine} =
    useStartMeeting({
      appId: APP_ID,
      meetConfig,
    });

  const styles = useStyleSheet(themedStyles);

  if (!joinSucceed) {
    return <ModalActivityIndicator modalVisible={modalVisible} />;
  }

  const renderVideos = () => {
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={meetConfig.channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {renderRemoteVideos()}
      </View>
    ) : null;
  };

  // Set the rendering mode of the video view as Hidden,
  // which uniformly scales the video until it fills the visible boundaries.
  const renderRemoteVideos = () => {
    if (peerIds.length === 0) return null;
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{paddingHorizontal: 2.5}}
        horizontal={true}>
        {peerIds.map((value, index, array) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={meetConfig.channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };

  return (
    <Layout level="1" style={styles.max}>
      <View style={styles.max}>
        <View style={styles.max}>
          <View style={styles.buttonHolder}>
            <TouchableOpacity onPress={endCall} style={styles.button}>
              <Text style={styles.buttonText}> End Call </Text>
            </TouchableOpacity>
          </View>
          {renderVideos()}
        </View>
      </View>
    </Layout>
  );
};

const themedStyles = StyleSheet.create({
  max: {
    flex: 1,
  },
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height - 100,
  },
  remoteContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 5,
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
});

export default VideoStream;
