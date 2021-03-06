import {useEffect, useRef, useState} from 'react';
import {Animated, AppState} from 'react-native';
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
import Sound from 'react-native-sound';
import {getRemoteUserByAgoraId} from '../../utils/User/Methods/getRemoteUser';
import {
  updateAudio,
  updateVideo,
} from '../../utils/Meeting/Methods/updateVideoAndMic';
import {createMeetLink} from '../../utils/Meeting/Methods/onSharingMeetLink';

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
  const [autoFocus, toggleAutoFocus] = useState<boolean>(false);

  //Instial value of the header and footer of the stream
  const [HeadFootHeight, toggleHeadFootHeight] = useState({
    head: new Animated.Value(0),
    foot: new Animated.Value(0),
  });

  //setting the reference for the engine
  let engine = useRef<RtcEngine | null>(null);

  //setting the ref for creating sounf
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

      //destroy the engine for the current user
      await engine.current?.destroy();

      //remove the user from the list
      baithak && (await onMemberLeftMeet(firebaseUser.uid, baithak));

      setPeerIds([]);
      setJoinSucceed(false);
      navigation.navigate(MEET_HOME_SCREEN);
    } catch (err) {
      console.log('Error in End call', err);
    }
  };

  //When the meet is running in backgroun camera should be off
  AppState.addEventListener('change', async (state) => {
    if (state === 'background' || state === 'inactive') {
      onClickCamera();
    }
  });

  const intializeRTC = async () => {
    try {
      //check the mic and video permissions
      await checkPermission();

      //AppId - Agora project App Id
      // creating an new engine and setting the ref
      engine.current = await RtcEngine.create(appId);

      // Enable the video module.
      await engine.current?.enableVideo();

      //Start the call
      await startCall();

      //================ Event Listeners Start ====================================

      // Listen for the UserJoined callback.
      // This callback occurs when the remote user successfully joins the channel.
      engine.current?.addListener('UserJoined', async (uid, elapsed) => {
        if (peerIds.indexOf(uid) === -1) {
          setPeerIds((prev) => [...prev, uid]);
          const userJoined = await getRemoteUserByAgoraId(uid);
          sound.current?.play();

          if (userJoined && userJoined.name) {
            Toast.show({
              type: 'info',
              text1: `${userJoined.name} joined`,
              position: 'top',
            });
          }
        }
      });

      // Listen for the UserOffline callback.
      // This callback occurs when the remote user gets cutt off the channel.
      engine.current?.addListener('UserOffline', async (uid, elapsed) => {
        const user = await getRemoteUserByAgoraId(uid);
        // Remove peer ID from state array
        setPeerIds((prev) => prev.filter((id) => id !== uid));
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
            onPressMeetInfo(); //initiallay show meet details
            await onHostJoinMeet(meetConfig, firebaseUser);
          } else {
            await onMemberJoinMeet(meetConfig, firebaseUser);
          }
          setJoinSucceed(true);
          toggleModal(false);
        },
      );

      //Listen for the Error callback.
      //This callback occurs when there is some error while doing video call
      engine.current?.addListener('Error', (err) => {
        console.log('Error', err);
        toggleModal(false);

        //We need to end the call for this user
        endCall();

        navigation.goBack();
        Toast.show({
          type: 'error',
          text1: 'Oops!',
          text2: 'Something went wrong. Please try again',
          position: 'top',
        });
      });
      //================ Event Listeners Ends ====================================
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

  //Main useEffect...After component did mount initialize RTC
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      e.preventDefault();
      unsubscribe();
      confirmEnd();
    });

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
      return () => unsubscribe();
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
      Toast.show({
        type: 'info',
        text1: `Camera auto-focus mode ${!autoFocus ? 'enabled' : 'disabled'}!`,
        position: 'top',
      });
      if (menuOpen) setMenuOpen(!menuOpen);
      engine.current?.setCameraAutoFocusFaceModeEnabled(!autoFocus);
      toggleAutoFocus(!autoFocus);
    }
  };

  //On speakeroff, incoming audio will be muted
  const onPressSpeaker = () => {
    if (engine.current) {
      Toast.show({
        type: 'info',
        text1: `Incoming Audios are ${!speakerOff ? 'Off' : 'On'}!`,
        position: 'top',
      });
      if (menuOpen) setMenuOpen(!menuOpen);
      engine.current?.muteAllRemoteAudioStreams(!speakerOff);
      toogleSpeaker(!speakerOff);
    }
  };

  //It will turn Off all incoming videos
  const onPressInVideo = () => {
    if (engine.current) {
      Toast.show({
        type: 'info',
        text1: `Incoming Videos are ${!inVideoOff ? 'Off' : 'On'}!`,
        position: 'top',
      });
      if (menuOpen) setMenuOpen(!menuOpen);
      engine.current?.muteAllRemoteVideoStreams(!inVideoOff);
      toogleInVideoOff(!inVideoOff);
    }
  };

  //Mic mute and unmute
  const onClickMic = async () => {
    try {
      setMuteAudio(!muteAudio);
      await engine.current?.enableLocalAudio(muteAudio);

      //update audio param in the DB to...this is needed to show photo when the user turn off there video
      await updateAudio(baithak, firebaseUser.uid, muteAudio);
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
    try {
      setMuteVideo(!muteVideo);
      await engine.current?.enableLocalVideo(muteVideo);

      //update video param in the DB to...this is needed to show photo when the user turn off there video
      await updateVideo(baithak, firebaseUser.uid, muteVideo);
    } catch (error) {
      console.log('Error in toggle locak video', error);
    }
  };

  //Display alert for ending
  const confirmEnd = () => {
    generalErrorN(
      {
        title: 'End Baithak',
        textMessage: 'Are you sure you want to end the baithak',
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

  //Method when the user is sharing meet info
  const onShare = async () => {
    try {
      toggleModal(true);
      if (menuOpen) setMenuOpen(!menuOpen);
      if (meetInfo) toogleMeetInfo(!meetInfo);

      const link = await createMeetLink(meetConfig.meetId, meetConfig.password);

      if (link) {
        await Share.share({message: getShareMessage(baithak, link)});
      }
      toggleModal(false);
    } catch (error) {
      toggleModal(false);
      console.log('Error in sharing', error);
    }
  };

  useEffect(() => {
    //After 10 seconds header and footer will go up and down respectively
    Animated.sequence([
      Animated.delay(10000),
      Animated.parallel([
        Animated.spring(HeadFootHeight.head, {
          toValue: -200,
          useNativeDriver: true,
          tension: -20,
        }),
        Animated.spring(HeadFootHeight.foot, {
          toValue: 200,
          useNativeDriver: true,
          tension: -20,
        }),
      ]),
    ]).start(() => {});
  }, [HeadFootHeight.head, HeadFootHeight.foot]);

  //When user tap on the screen header and footer should come back
  const onPressMainStreamView = () => {
    toggleHeadFootHeight({
      head: new Animated.Value(0),
      foot: new Animated.Value(0),
    });
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
    autoFocus,
    enableAutoCameraFocus,
    HeadFootHeight,
    onPressMainStreamView,
  };
};

export default useStartMeeting;
