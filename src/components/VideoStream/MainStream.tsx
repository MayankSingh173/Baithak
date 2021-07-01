import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora';
import {screenHeight, screenWidth} from '../../constants/screen/screenInfo';
import {getRemoteStreamDimensions} from '../../utils/Screen/screen';

interface props {
  channelName: string;
  peerId: number[];
}

const MainStream = ({peerId, channelName}: props) => {
  const {height, width} = getRemoteStreamDimensions(peerId.length);

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
      <View style={styles.localView}>
        <RtcLocalView.SurfaceView
          channelId={channelName}
          style={{flex: 1, borderRadius: 30}}
          renderMode={VideoRenderMode.Hidden}
          zOrderMediaOverlay={true}
        />
      </View>
      {peerId.length <= 2 ? (
        <FlatList
          key={'#'}
          data={peerId}
          keyExtractor={(item) => '#' + item}
          renderItem={({index, item}) => {
            return (
              <View
                style={{
                  height: height,
                  width: width,
                  borderWidth: 2,
                  borderColor: 'white',
                }}>
                <RtcRemoteView.SurfaceView
                  style={{flex: 1}}
                  uid={item}
                  channelId={channelName}
                  renderMode={VideoRenderMode.Hidden}
                  key={index}
                />
              </View>
            );
          }}
          numColumns={1}
        />
      ) : (
        <FlatList
          data={peerId}
          key={'_'}
          keyExtractor={(item) => '_' + item}
          renderItem={({index, item}) => {
            return (
              <RtcRemoteView.SurfaceView
                style={{height: height, width: width}}
                uid={item}
                channelId={channelName}
                renderMode={VideoRenderMode.Hidden}
                key={index}
              />
            );
          }}
          numColumns={1}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  localView: {
    height: 150,
    width: 90,
    position: 'absolute',
    bottom: 100,
    right: 20,
    elevation: 10,
    zIndex: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default MainStream;
