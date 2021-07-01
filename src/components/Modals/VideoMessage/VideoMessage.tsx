import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import Modal from 'react-native-modal';
import {Baithak} from '../../../models/Meeting/CreateMeeting/interface';
import BackHeader from '../../Headers/BackHeader/BackHeader';
import useGetMeetMssg from '../../../hooks/Messages/Meeting/useGetMeetMssg';
import VideoChat from '../../Messages/VideoChat';

interface props {
  baithak: Baithak | undefined;
  onBackDropPress: () => void;
  modalVisible: boolean;
}

const VideoMessage = (props: props) => {
  if (!props.baithak) return null;
  const {messages, handleSend, isMoreLoading, loadMore, lastDoc} =
    useGetMeetMssg(props.baithak);

  const styles = useStyleSheet(themedStyles);
  return (
    <Modal
      isVisible={props.modalVisible}
      hasBackdrop={true}
      onBackdropPress={props.onBackDropPress}
      style={styles.modal}
      animationIn="zoomIn"
      animationOut="zoomOut"
      coverScreen={true}
      useNativeDriver
      onBackButtonPress={props.onBackDropPress}>
      <Layout style={styles.main} level="2">
        <View style={styles.header}>
          <BackHeader
            leftIcon="arrow-back-outline"
            onLeftPress={props.onBackDropPress}
            centerText="Messages"
          />
        </View>
        <VideoChat
          message={messages}
          handleSend={handleSend}
          isMoreLoading={isMoreLoading}
          lastDoc={lastDoc}
          loadMore={loadMore}
          baithak={props.baithak}
        />
      </Layout>
    </Modal>
  );
};

const themedStyles = StyleSheet.create({
  main: {
    flex: 1,
  },
  modal: {
    flex: 1,
    margin: 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 0.3,
    borderColor: 'grey',
  },
});

export default VideoMessage;
