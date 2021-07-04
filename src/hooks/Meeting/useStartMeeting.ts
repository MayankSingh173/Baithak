import {useEffect, useRef, useState} from 'react';
import RtcEngine from 'react-native-agora';
import {generalErrorN} from '../../components/Alerts/GeneralError';
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
import {Share} from 'react-native';
import {getShareMessage} from '../../utils/Meeting/Methods/getShareMessage';
import Toast from 'react-native-toast-message';
import {getBaithakPartiFromAgoraId} from '../../utils/Messages/Meeting/utils';
import Sound from 'react-native-sound';
import {getRemoteUserByAgoraId} from '../../utils/User/Methods/getRemoteUser';

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
  const [flashOn, toggleFlash] = useState<boolean>(false);

  let engine = useRef<RtcEngine | null>(null);
  let sound = useRef<Sound | null>(
    new Sound('joined.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      sound.current?.play(() => sound.current?.release());
    }),
  );

  const startCall = async () => {
    await engine.current?.joinChannel(
      meetConfig.token,
      meetConfig.channelName,
      null,
      meetConfig.agoraId,
    );
  };

  const endCall = async () => {
    try {
      await engine.current?.leaveChannel();

      await engine.current?.destroy();

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
    const intializeRTC = async () => {
      try {
        await checkPermission();

        engine.current = await RtcEngine.create(appId);

        // Enable the video module.
        await engine.current?.enableVideo();

        //Start the call
        await startCall();

        //================ Event Listeners Start ====================================

        // Listen for the UserJoined callback.
        // This callback occurs when the remote user successfully joins the channel.
        engine.current?.addListener('UserJoined', (uid, elapsed) => {
          if (peerIds.indexOf(uid) === -1) {
            setPeerIds((prev) => [...prev, uid]);
            const userJoined = getBaithakPartiFromAgoraId(uid, baithak);
            sound.current?.play();
            Toast.show({
              type: 'info',
              text1: `${userJoined.name ? userJoined.name : 'Someone'} joined`,
              position: 'top',
            });
          }
        });

        // Listen for the UserOffline callback.
        // This callback occurs when the remote user gets cutt off the channel.
        engine.current?.addListener('UserOffline', (uid, elapsed) => {
          const user = getRemoteUserByAgoraId(uid);
          if (user && user.name) {
            Toast.show({
              type: 'info',
              text1: `${user.name} left the Baithak`,
              position: 'top',
            });
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
            onPressMeetInfo();
            setJoinSucceed(true);
            toggleModal(false);
          },
        );

        //Listen for the Warning callback.
        //This callback occurs when there is some warning
        // engine.current?.addListener('Warning', (warn) => {
        //   console.log('Warn', warn);
        // });

        //Listen for the Warning callback.
        //This callback occurs when there is some warning
        engine.current?.addListener('Error', (err) => {
          console.log('Error', err);
          toggleModal(false);
          navigation.goBack();
          Toast.show({
            type: 'error',
            text1: 'Oops!',
            text2: 'Something went wrong. Please try again',
            position: 'top',
          });
        });
      } catch (err) {
        engine.current?.destroy();
        console.log('Error in initialize RTC', err);
        toggleModal(false);
        navigation.goBack();
        Toast.show({
          type: 'error',
          text1: 'Oops!',
          text2: 'Something went wrong. Please try again',
          position: 'top',
          visibilityTime: 300,
        });
      }
    };

    //================ Event Listeners Ends ====================================

    //Call the initialize RTC method
    intializeRTC();
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
      engine.current?.setCameraTorchOn(!flashOn);
      toggleFlash(!flashOn);
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
      Toast.show({
        type: 'info',
        text1: `Incoming Audios are ${speakerOff ? 'Off' : 'On'}!`,
        position: 'top',
      });
      if (menuOpen) setMenuOpen(!menuOpen);
      engine.current?.muteAllRemoteAudioStreams(speakerOff);
    }
  };

  //It will turn Off all incoming videos
  const onPressInVideo = () => {
    if (engine.current) {
      toogleInVideoOff(!inVideoOff);
      Toast.show({
        type: 'info',
        text1: `Incoming Videos are ${inVideoOff ? 'Off' : 'On'}!`,
        position: 'top',
      });
      if (menuOpen) setMenuOpen(!menuOpen);
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
    try {
      if (menuOpen) setMenuOpen(!menuOpen);
      if (meetInfo) toogleMeetInfo(!meetInfo);
      await Share.share({message: getShareMessage(baithak)});
    } catch (error) {
      console.log('Error in sharing', error);
    }
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
    flashOn,
    onCamerFlashOn,
  };
};

export default useStartMeeting;
