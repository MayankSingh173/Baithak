import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora';

interface props {
  channelName: string;
  peerId: number[];
}

const MainStream = ({peerId, channelName}: props) => {
  if (peerId.length === 0) {
    return (
      <RtcLocalView.SurfaceView
        channelId={channelName}
        style={styles.main}
        renderMode={VideoRenderMode.Hidden}
      />
    );
  }

  return (
    <View style={styles.main}>
      <RtcLocalView.SurfaceView
        channelId={channelName}
        style={styles.localView}
        renderMode={VideoRenderMode.Hidden}
      />
      {peerId.length <= 2 ? (
        <View style={styles.main}>
          {peerId.map((value, index, array) => {
            return (
              <RtcRemoteView.SurfaceView
                style={styles.main}
                uid={value}
                channelId={channelName}
                renderMode={VideoRenderMode.Hidden}
                zOrderMediaOverlay={true}
              />
            );
          })}
        </View>
      ) : (
        <ScrollView>
          {peerId.map((value, index, array) => {
            return (
              <RtcRemoteView.SurfaceView
                style={styles.remoteView}
                uid={value}
                channelId={channelName}
                renderMode={VideoRenderMode.Hidden}
                zOrderMediaOverlay={true}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  localView: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 100,
    right: 20,
    borderRadius: 50,
    elevation: 10,
  },
  remoteView: {
    height: '50%',
    width: '100%',
  },
});

export default MainStream;
