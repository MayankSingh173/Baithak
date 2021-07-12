import {useStyleSheet, Layout} from '@ui-kitten/components';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, Pressable, Animated} from 'react-native';
import useStartMeeting from '../../../hooks/Meeting/useStartMeeting';
import ModalActivityIndicator from '../../../components/Modals/ModalActivityIndicator/ModalActivityIndicator';
import {VideoStreamParams} from '../../../models/Meeting/CreateMeeting/interface';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';
import BackHeader from '../../../components/Headers/BackHeader/BackHeader';
import VideoFooter from '../../../components/Footers/VideoFooter/VideoFooter';
import MainStream from '../../../components/VideoStream/MainStream';
import {APP_ID} from '../../../../environment';
import VideoOptions from '../../../components/Modals/VideoOptions/VideoOptions';
import VideoMessage from '../../../components/Modals/VideoMessage/VideoMessage';
import MeetInfo from '../../../components/Modals/MeetInfo/MeetInfo';
import MeetParticpants from '../../../components/Modals/MeetParticipants/MeetParticipants';
import {getRefinedText} from '../../../utils/Miscellaneous/utils';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const VideoStream = (props: any) => {
  //get the neccessary parameters coming from CREATE_MEET_SCREEN and JOIN_MEET_SCREEN
  const meetConfig: VideoStreamParams = props.route.params;

  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const {
    joinSucceed,
    peerIds,
    modalVisible,
    onClickMenu,
    onClickMessage,
    onClickMic,
    onClickCamera,
    muteAudio,
    muteVideo,
    onSwitchCamera,
    menuOpen,
    confirmEnd,
    messageOpen,
    baithak,
    meetInfo,
    onPressMeetInfo,
    showParticipants,
    onPressParticipants,
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
  } = useStartMeeting(
    {
      appId: APP_ID,
      meetConfig,
      firebaseUser,
    },
    props.navigation,
  );

  const styles = useStyleSheet(themedStyles);

  if (!joinSucceed) {
    return <ModalActivityIndicator modalVisible={modalVisible} />;
  }

  return (
    <Layout style={styles.main}>
      <ModalActivityIndicator modalVisible={modalVisible} />
      <VideoOptions
        modalVisible={menuOpen}
        onBackDropPress={onClickMenu}
        onPressMeetInfo={onPressMeetInfo}
        onPressParticipants={onPressParticipants}
        onShare={onShare}
        onPressSpeaker={onPressSpeaker}
        speakerOff={speakerOff}
        inVideoOff={inVideoOff}
        onPressInVideo={onPressInVideo}
        autoFocus={autoFocus}
        onPressFocus={enableAutoCameraFocus}
      />
      <VideoMessage
        modalVisible={messageOpen}
        onBackDropPress={onClickMessage}
        baithak={baithak}
      />
      <MeetInfo
        modalVisible={meetInfo}
        onBackDropPress={onPressMeetInfo}
        onShare={onShare}
        meetConfig={meetConfig}
      />
      <MeetParticpants
        modalVisible={showParticipants}
        onBackDropPress={onPressParticipants}
        participants={baithak?.members}
      />
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            transform: [
              {
                translateY: HeadFootHeight.head,
              },
            ],
          },
        ]}>
        <BackHeader
          leftIcon="arrow-back-outline"
          onLeftPress={confirmEnd}
          rightIcon="sync-outline"
          onRightPress={onSwitchCamera}
          centerText={getRefinedText(meetConfig.channelName, 20)}
          leftIconColor="white"
          centerTextColor="white"
          rightIconColor="white"
          rightLeftIcon={flashOn ? 'flash-outline' : 'flash-off-outline'}
          rightLeftIconColor="white"
          onPressRightLeftIcon={onCamerFlashOn}
        />
      </Animated.View>
      <Pressable onPress={onPressMainStreamView} style={styles.mainStream}>
        <MainStream
          channelName={meetConfig.channelName}
          peerId={peerIds}
          uid={firebaseUser.uid}
          baithak={baithak}
          incomingVideos={inVideoOff}
          incomingAudios={speakerOff}
        />
      </Pressable>
      <Animated.View
        style={[
          styles.footer,
          {
            transform: [
              {
                translateY: HeadFootHeight.foot,
              },
            ],
          },
        ]}>
        <VideoFooter
          onClickCamera={onClickCamera}
          endCall={confirmEnd}
          onClickMic={onClickMic}
          onClickMenu={onClickMenu}
          onClickMessage={onClickMessage}
          muteAudio={muteAudio}
          muteVideo={muteVideo}
        />
      </Animated.View>
    </Layout>
  );
};

const themedStyles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingRight: 20,
    zIndex: 2,
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    left: 10,
    top: 10,
  },
  mainStream: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 25,
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
