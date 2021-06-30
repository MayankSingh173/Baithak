import {useEffect, useRef, useState} from 'react';
import RtcEngine from 'react-native-agora';
import {generalError} from '../../components/Alerts/GeneralError';
import {TITLE} from '../../constants/Alerts/GeneralError';
import {MEET_HOME_SCREEN} from '../../constants/Navigation/Navigation';
import {VideoStreamParams} from '../../models/Meeting/CreateMeeting/interface';
import {UserInterface} from '../../models/User/User';
import {onHostJoinMeet} from '../../utils/Meeting/Methods/onHostJoinMeet';
import {
  onMemberJoinMeet,
  onMemberLeftMeet,
} from '../../utils/Meeting/Methods/onMemberJoinMeet';
import {checkPermission} from '../../utils/Permissions/Permission';

interface props {
  appId: string;
  meetConfig: VideoStreamParams;
  firebaseUser: UserInterface;
}

const useStartMeeting = (
  {appId, meetConfig, firebaseUser}: props,
  navigation: any,
) => {
  const [joinSucceed, setJoinSucceed] = useState<boolean>(false);
  const [peerIds, setPeerIds] = useState<Array<number>>([]);
  const [muteAudio, setMuteAudio] = useState<boolean>(false);
  const [muteVideo, setMuteVideo] = useState<boolean>(false);
  const [modalVisible, toggleModal] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [messageOpen, setMessageOpen] = useState<boolean>(false);

  let engine = useRef<RtcEngine | null>(null);

  const startCall = async () => {
    console.log('Start call');
    try {
      await engine.current?.joinChannel(
        meetConfig.token,
        meetConfig.channelName,
        null,
        meetConfig.agoraId,
      );
    } catch (err) {
      console.log('Error in Start Call', err);
    }
  };

  const endCall = async () => {
    try {
      console.log('end Call');
      await engine.current?.leaveChannel();

      //remove the user from the list
      await onMemberLeftMeet(meetConfig, firebaseUser);

      setPeerIds([]);
      setJoinSucceed(false);
      navigation.navigate(MEET_HOME_SCREEN);
    } catch (err) {
      console.log('Error in End call', err);
    }
  };

  const intializeRTC = async () => {
    try {
      await checkPermission();

      engine.current = await RtcEngine.create(appId);

      // Enable the video module.
      await engine.current?.enableVideo();

      //Start the call
      await startCall();

      engine.current?.addListener('UserJoined', (uid, elapsed) => {
        console.log('UserJoined', uid, elapsed);
        if (peerIds.indexOf(uid) === -1) {
          setPeerIds((prev) => [...prev, uid]);
        }
      });

      // Listen for the JoinChannelSuccess callback.
      // This callback occurs when the local user successfully joins the channel.
      engine.current?.addListener(
        'JoinChannelSuccess',
        async (channel, uid, elapsed) => {
          if (meetConfig.creater === 'Host') {
            await onHostJoinMeet(meetConfig, firebaseUser);
          } else {
            await onMemberJoinMeet(meetConfig, firebaseUser);
          }
          setJoinSucceed(true);
          toggleModal(false);
        },
      );

      engine.current?.addListener('Warning', (warn) => {
        console.log('Warn', warn);
      });

      engine.current?.addListener('Error', (err) => {
        console.log('Error', err);
        toggleModal(false);
        navigation.goBack();
        generalError(() => toggleModal(false), {
          title: TITLE,
          textMessage: 'Please try again',
          okText: 'Ok',
        });
      });
    } catch (err) {
      console.log('Error in initialize RTC', err);
    }
  };

  useEffect(() => {
    try {
      intializeRTC();
    } catch (err) {
      console.log('Error in initializing RTC', err);
    }
  }, []);

  //switch between front and back camera
  const onSwitchCamera = () => {
    if (engine.current) {
      engine.current?.switchCamera();
    }
  };

  //Make the camera to flash on
  const onCamerFlashOn = () => {
    if (engine.current) {
      engine.current?.setCameraTorchOn(true);
    }
  };

  //Enables auto focus camera
  const enableAutoCameraFocus = () => {
    if (engine.current) {
      engine.current?.setCameraAutoFocusFaceModeEnabled;
    }
  };

  //Mic mute and unmute
  const onClickMic = async () => {
    try {
      setMuteAudio(!muteAudio);
      console.log('n');
      await engine.current?.enableLocalAudio(muteAudio);
    } catch (err) {
      console.log('Error in toggle mic', err);
    }
  };

  //Menu open and close
  const onClickMenu = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };

  //Menu open and close
  const onClickMessage = () => {
    setMessageOpen(!messageOpen);
    console.log(messageOpen);
  };

  //Camera open and close
  const onClickCamera = async () => {
    setMuteVideo(!muteVideo);
    await engine.current?.enableLocalVideo(muteVideo);
  };

  return {
    peerIds,
    joinSucceed,
    startCall,
    endCall,
    toggleModal,
    modalVisible,
    engine,
    onClickCamera,
    onClickMic,
    menuOpen,
    messageOpen,
    onClickMessage,
    onClickMenu,
    muteAudio,
    muteVideo,
    onSwitchCamera,
  };
};

export default useStartMeeting;
