import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora';
import FastImage from 'react-native-fast-image';
import {Baithak} from '../../models/Meeting/CreateMeeting/interface';
import {
  getLocalAudioAndVideoStates,
  getRemoteAudioAndVideoStates,
} from '../../utils/Meeting/Methods/getAudioAndVideoStates';
import {getRemoteStreamDimensions} from '../../utils/Screen/screen';
import {Icon, Layout} from '@ui-kitten/components';

interface props {
  channelName: string;
  peerId: number[];
  uid: string;
  baithak?: Baithak;
  incomingVideos: boolean;
  incomingAudios: boolean;
}

const MainStream = ({
  peerId,
  channelName,
  baithak,
  uid,
  incomingAudios,
  incomingVideos,
}: props) => {
  const {height, width} = getRemoteStreamDimensions(peerId.length);

  const localMediaStates = getLocalAudioAndVideoStates(baithak, uid);

  const rendorMicBar = (audio?: boolean) => {
    if (audio) return null;
    return (
      <View style={styles.micBar}>
        <View
          style={[styles.iconView, {backgroundColor: 'rgba(0, 0, 0, 0.2)'}]}>
          <Icon name={'mic-off-outline'} style={[styles.icon]} fill="red" />
        </View>
      </View>
    );
  };

  if (peerId.length === 0) {
    return (
      <Layout level="1" style={styles.main}>
        {localMediaStates?.video ? (
          <RtcLocalView.SurfaceView
            channelId={channelName}
            style={styles.main}
            renderMode={VideoRenderMode.Hidden}
          />
        ) : (
          <View style={styles.imageView}>
            <FastImage
              source={{uri: localMediaStates?.imageUrl}}
              style={styles.image}
            />
          </View>
        )}
        {rendorMicBar(localMediaStates?.audio)}
      </Layout>
    );
  }

  return (
    <View style={styles.main}>
      <Layout level="1" style={styles.localView}>
        {localMediaStates?.video ? (
          <RtcLocalView.SurfaceView
            channelId={channelName}
            style={{flex: 1, borderRadius: 30}}
            renderMode={VideoRenderMode.Hidden}
            zOrderMediaOverlay={true}
          />
        ) : (
          <View style={styles.imageView}>
            <FastImage
              source={{uri: localMediaStates?.imageUrl}}
              style={{height: 50, width: 50, borderRadius: 50}}
            />
          </View>
        )}
        {rendorMicBar(localMediaStates?.audio)}
      </Layout>
      {peerId.length <= 2 ? (
        <FlatList
          key={'#'}
          data={peerId}
          keyExtractor={(item) => '#' + item}
          renderItem={({index, item}) => {
            const remoteVideoStates = getRemoteAudioAndVideoStates(
              baithak,
              item,
            );
            return (
              <View
                style={{
                  height: height,
                  width: width,
                }}>
                {remoteVideoStates?.video && !incomingVideos ? (
                  <RtcRemoteView.SurfaceView
                    style={{flex: 1}}
                    uid={item}
                    channelId={channelName}
                    renderMode={VideoRenderMode.Hidden}
                    key={index}
                  />
                ) : (
                  <View style={styles.imageView}>
                    <FastImage
                      source={{uri: remoteVideoStates?.imageUrl}}
                      style={styles.image}
                    />
                  </View>
                )}
                {rendorMicBar(remoteVideoStates?.audio && !incomingAudios)}
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
            const remoteVideoStates = getRemoteAudioAndVideoStates(
              baithak,
              item,
            );
            return (
              <View
                style={{
                  height: height,
                  width: width,
                }}>
                {remoteVideoStates?.video && !incomingVideos ? (
                  <RtcRemoteView.SurfaceView
                    style={{flex: 1}}
                    uid={item}
                    channelId={channelName}
                    renderMode={VideoRenderMode.Hidden}
                    key={index}
                  />
                ) : (
                  <View style={styles.imageView}>
                    <FastImage
                      source={{uri: remoteVideoStates?.imageUrl}}
                      style={styles.image}
                    />
                  </View>
                )}
                {rendorMicBar(remoteVideoStates?.audio && !incomingAudios)}
              </View>
            );
          }}
          numColumns={2}
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
  imageView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 100,
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 5,
  },
  icon: {
    width: 15,
    height: 15,
  },
  micBar: {
    width: '100%',
    padding: 10,
    alignItems: 'flex-end',
    marginTop: -50,
  },
});

export default MainStream;
