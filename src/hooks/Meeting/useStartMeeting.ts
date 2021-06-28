import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import RtcEngine from 'react-native-agora';

interface props {
  appId: string;
  channelName: string;
  token: string;
  meetId: string;
  password: string;
  description?: string;
  agoraId: number;
}

interface State {
  appId: string;
  channelName: string;
  token: string;
  joinSucceed: boolean;
  peerIds: number[];
}

const useStartMeeting = ({
  channelName,
  token,
  appId,
  agoraId,
  meetId,
  password,
  description,
}: props) => {
  const [state, setState] = useState<State>({
    appId: appId,
    channelName: channelName,
    token: token,
    joinSucceed: false,
    peerIds: [],
  });

  const [joined, setJoined] = useState<boolean>(false);

  const [modalVisible, toggleModal] = useState<boolean>(true);

  const [engine, setEngine] = useState<RtcEngine>();

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

  const startCall = async () => {
    console.log('Start call');

    try {
      await engine?.joinChannel(
        state.token,
        state.channelName.split(' ')[0],
        null,
        agoraId,
      );
      setJoined(true);
    } catch (err) {
      console.log(err);
    }
  };

  const endCall = async () => {
    await engine?.leaveChannel();
    setState((prev) => ({...prev, peerIds: [], joinSucceed: false}));
  };

  const intializeRTC = async () => {
    try {
      console.log('Initialize');
      const {appId} = state;
      const new_engine = await RtcEngine.create(appId);
      // Enable the video module.
      setEngine(new_engine);
      await engine?.enableVideo();
      await startCall();
      // await startCall().catch((err) => console.log('start', err));
    } catch (err) {
      console.log('Error in initialize RTC', err);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }, []);

  useEffect(() => {
    try {
      intializeRTC();
    } catch (err) {
      console.log('Error in initializing RTC', err);
    }
  }, [joined]);

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
    toggleModal(false);
  });

  engine?.addListener('Warning', (warn) => {
    console.log('Warn', warn);
  });

  engine?.addListener('Error', (err) => {
    console.log('Error', err);
  });

  return {
    state,
    startCall,
    endCall,
    toggleModal,
    modalVisible,
    engine,
  };
};

export default useStartMeeting;
