import {Text, useStyleSheet, Layout} from '@ui-kitten/components';
import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import {RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora';
import useStartMeeting from '../../../hooks/Meeting/useStartMeeting';
import ModalActivityIndicator from '../../../components/Modals/ModalActivityIndicator/ModalActivityIndicator';
import {VideoStreamParams} from '../../../models/Meeting/CreateMeeting/interface';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';
import BackHeader from '../../../components/Headers/BackHeader/BackHeader';
import VideoFooter from '../../../components/Footers/VideoFooter/VideoFooter';
import MainStream from '../../../components/VideoStream/MainStream';

const APP_ID = '63ad64d4cbcb4222b288c85cfb41be47';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const VideoStream = (props: any) => {
  const meetConfig: VideoStreamParams = props.route.params;

  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const {
    joinSucceed,
    peerIds,
    endCall,
    modalVisible,
    onClickMenu,
    onClickMessage,
    onClickMic,
    onClickCamera,
    muteAudio,
    muteVideo,
    onSwitchCamera,
  } = useStartMeeting({
    appId: APP_ID,
    meetConfig,
    firebaseUser,
  });

  const styles = useStyleSheet(themedStyles);

  if (!joinSucceed) {
    return <ModalActivityIndicator modalVisible={modalVisible} />;
  }

  return (
    <Layout style={styles.main}>
      <View style={styles.header}>
        <BackHeader
          leftIcon="arrow-back-outline"
          onLeftPress={() => console.log('On back')}
          rightIcon="sync-outline"
          onRightPress={onSwitchCamera}
          centerText={meetConfig.channelName}
        />
      </View>
      <View style={styles.mainStream}>
        <MainStream channelName={meetConfig.channelName} peerId={peerIds} />
      </View>
      <View style={styles.footer}>
        <VideoFooter
          onClickCamera={onClickCamera}
          endCall={endCall}
          onClickMic={onClickMic}
          onClickMenu={onClickMenu}
          onClickMessage={onClickMessage}
          muteAudio={muteAudio}
          muteVideo={muteVideo}
        />
      </View>
    </Layout>
  );
};

const themedStyles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    margin: 10,
    marginHorizontal: 20,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    borderColor: 'grey',
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
