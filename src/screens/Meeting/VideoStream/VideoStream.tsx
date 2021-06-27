import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import React, {Component} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
// Import the RtcEngine class and view rendering components into your project.
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

// Define a Props interface.
interface Props {}

// Define a State interface.
interface State {
  appId: string;
  channelName: string;
  token: string;
  joinSucceed: boolean;
  peerIds: number[];
}

const VideoStream = (props: any) => {
  const {token, name, meetId, password, description, channelName, agoraId} =
    props.route.params;

  const styles = useStyleSheet(themedStyles);

  const [state, setState] = useState<State>({
    appId: '214682f487d14dfbbb8ff290b96d9c6e',
    channelName: channelName,
    token: token,
    joinSucceed: false,
    peerIds: [],
  });

  const [engine, setEngine] = useState<RtcEngine>();

  useEffect(() => {
    const requestCameraAndAudioPermission = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        if (
          granted['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.CAMERA'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('You can use the cameras & mic');
        } else {
          console.log('Permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }

    intializeRTC();
    return () => {};
  }, []);

  const intializeRTC = async () => {
    try {
      const {token, appId} = state;
      const new_engine = await RtcEngine.create(appId);
      // Enable the video module.
      setEngine(new_engine);

      await engine?.enableVideo().then(() => console.log('video enable'));
    } catch (err) {
      console.log(err);
    }
    // Listen for the UserJoined callback.
    // This callback occurs when the remote user successfully joins the channel.
  };

  engine?.addListener('UserJoined', (uid, elapsed) => {
    console.log('UserJoined', uid, elapsed);
    const {peerIds} = state;
    if (peerIds.indexOf(uid) === -1) {
      setState((prev) => ({...prev, peerIds: [...peerIds, uid]}));
    }
  });

  // Listen for the UserOffline callback.
  // This callback occurs when the remote user leaves the channel or drops offline.
  engine?.addListener('UserOffline', (uid, reason) => {
    console.log('UserOffline', uid, reason);
    const {peerIds} = state;
    setState((prev) => ({
      ...prev,
      // Remove peer ID from state array
      peerIds: peerIds.filter((id) => id !== uid),
    }));
  });

  // Listen for the JoinChannelSuccess callback.
  // This callback occurs when the local user successfully joins the channel.
  engine?.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
    console.log('JoinChannelSuccess', channel, uid, elapsed);
    setState((prev) => ({
      ...prev,
      joinSucceed: true,
    }));
  });

  engine?.addListener('Warning', (warn) => {
    console.log('Warn', warn);
  });

  engine?.addListener('Error', (err) => {
    console.log('Error', err);
  });

  const renderVideos = () => {
    const {joinSucceed} = state;
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={state.channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {renderRemoteVideos()}
      </View>
    ) : null;
  };

  // Set the rendering mode of the video view as Hidden,
  // which uniformly scales the video until it fills the visible boundaries.
  const renderRemoteVideos = () => {
    const {peerIds} = state;
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
              channelId={state.channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };

  const startCall = async () => {
    try {
      await engine
        ?.joinChannel(state.token, state.channelName, null, agoraId)
        .then(() => console.log('join'));
      engine?.joinChannel;
    } catch (err) {
      console.log(err);
    }
  };

  const endCall = async () => {
    await engine?.leaveChannel();
    setState((prev) => ({...prev, peerIds: [], joinSucceed: false}));
  };

  return (
    <View style={styles.max}>
      <View style={styles.max}>
        <View style={styles.buttonHolder}>
          <TouchableOpacity onPress={startCall} style={styles.button}>
            <Text style={styles.buttonText}> Start Call </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={endCall} style={styles.button}>
            <Text style={styles.buttonText}> End Call </Text>
          </TouchableOpacity>
        </View>
        {renderVideos()}
      </View>
    </View>
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
