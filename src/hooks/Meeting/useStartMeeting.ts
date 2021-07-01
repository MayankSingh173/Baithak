import {useEffect, useRef, useState} from 'react';
import RtcEngine from 'react-native-agora';
import {
  generalError,
  generalErrorN,
} from '../../components/Alerts/GeneralError';
import {TITLE} from '../../constants/Alerts/GeneralError';
import {MEET_HOME_SCREEN} from '../../constants/Navigation/Navigation';
import {
  Baithak,
  VideoStreamParams,
} from '../../models/Meeting/CreateMeeting/interface';
import {UserInterface} from '../../models/User/User';
import {onHostJoinMeet} from '../../utils/Meeting/Methods/onHostJoinMeet';
import {
  onMemberJoinMeet,
  onMemberLeftMeet,
} from '../../utils/Meeting/Methods/onMemberJoinMeet';
import {checkPermission} from '../../utils/Permissions/Permission';
import firestore from '@react-native-firebase/firestore';
import {Share, ToastAndroid} from 'react-native';
import {getShareMessage} from '../../utils/Meeting/Methods/getShareMessage';

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
  const [baithak, setBaithak] = useState<Baithak>();
  const [meetInfo, toogleMeetInfo] = useState<boolean>(false);
  const [showParticipants, toogleParticipants] = useState<boolean>(false);
  const [speakerOff, toogleSpeaker] = useState<boolean>(false);
  const [inVideoOff, toogleInVideoOff] = useState<boolean>(false);

  let engine = useRef<RtcEngine | null>(null);

  const startCall = async () => {
    try {
      await engine.current?.joinChannel(
        meetConfig.token,
        meetConfig.channelName,
        null,
        meetConfig.agoraId,
      );
    } catch (err) {
      console.log('Error in start call', err);
      toggleModal(false);
      navigation.goBack();
      generalError(() => toggleModal(false), {
        title: TITLE,
        textMessage: 'Please try again',
        okText: 'Ok',
      });
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

  useEffect(() => {
    try {
      const intializeRTC = async () => {
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
      };

      intializeRTC();
    } catch (err) {
      console.log('Error in initialize RTC', err);
      toggleModal(false);
      navigation.goBack();
      generalError(() => toggleModal(false), {
        title: TITLE,
        textMessage: 'Please try again',
        okText: 'Ok',
      });
    }
  }, []);

  useEffect(() => {
    try {
      const unsubscribe = firestore()
        .collection('Baithak')
        .doc(`${meetConfig.meetId}${meetConfig.password}`)
        .onSnapshot((snapshot) => {
          if (snapshot.exists) {
            setBaithak(snapshot.data() as Baithak);
          }
        });
      return () => {
        unsubscribe();
      };
    } catch (err) {
      console.log(err);
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

  //On speakeroff, incoming audio will be muted
  const onPressSpeaker = () => {
    if (engine.current) {
      toogleSpeaker(!speakerOff);
      ToastAndroid.show(
        `Incoming Audios are ${speakerOff ? 'On' : 'Off'}!`,
        ToastAndroid.SHORT,
      );
      engine.current?.muteAllRemoteAudioStreams(speakerOff);
    }
  };

  //It will turn Off all incoming videos
  const onPressInVideo = () => {
    if (engine.current) {
      toogleInVideoOff(!inVideoOff);
      ToastAndroid.show(
        `Incoming Videos are ${inVideoOff ? 'On' : 'Off'}!`,
        ToastAndroid.SHORT,
      );
      engine.current?.muteAllRemoteVideoStreams(inVideoOff);
    }
  };

  //Mic mute and unmute
  const onClickMic = async () => {
    try {
      setMuteAudio(!muteAudio);
      await engine.current?.enableLocalAudio(muteAudio);
    } catch (err) {
      console.log('Error in toggle mic', err);
    }
  };

  //Menu open and close
  const onClickMenu = () => {
    setMenuOpen(!menuOpen);
  };

  //Menu open and close
  const onClickMessage = () => {
    setMessageOpen(!messageOpen);
  };

  //Camera open and close
  const onClickCamera = async () => {
    setMuteVideo(!muteVideo);
    await engine.current?.enableLocalVideo(muteVideo);
  };

  //Display alert for ending
  const confirmEnd = () => {
    generalErrorN(
      {
        title: 'End Baithak',
        textMessage: 'Are you sure you want to end the baitha',
        okText: 'Yes',
      },
      [
        {
          text: 'No',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: endCall,
        },
      ],
    );
  };

  const onPressMeetInfo = () => {
    if (menuOpen) setMenuOpen(!menuOpen);
    toogleMeetInfo(!meetInfo);
  };

  const onPressParticipants = () => {
    if (menuOpen) setMenuOpen(!menuOpen);
    toogleParticipants(!showParticipants);
  };

  const onShare = async () => {
    if (menuOpen) setMenuOpen(!menuOpen);
    if (meetInfo) toogleMeetInfo(!meetInfo);
    const result = Share.share({message: getShareMessage(baithak)});
  };

  return {
    peerIds,
    joinSucceed,
    startCall,
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
    confirmEnd,
    baithak,
    onPressMeetInfo,
    meetInfo,
    onPressParticipants,
    showParticipants,
    onShare,
    speakerOff,
    onPressSpeaker,
    inVideoOff,
    onPressInVideo,
  };
};

export default useStartMeeting;
