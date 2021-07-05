import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import Modal from 'react-native-modal';
import {Baithak} from '../../../models/Meeting/CreateMeeting/interface';
import BackHeader from '../../Headers/BackHeader/BackHeader';
import useGetMeetMssg from '../../../hooks/Messages/Meeting/useGetMeetMssg';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';
import {Group} from '../../../models/Messages/interface';

interface props {
  group: Group;
  onBackDropPress: () => void;
  modalVisible: boolean;
}

const GroupInfoModal = (props: props) => {
  if (!props.group) return null;

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const styles = useStyleSheet(themedStyles);
  return (
    <Modal
      isVisible={props.modalVisible}
      hasBackdrop={true}
      onBackdropPress={props.onBackDropPress}
      style={styles.modal}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      coverScreen={true}
      useNativeDriver
      onBackButtonPress={props.onBackDropPress}>
      <Layout style={styles.main} level="2">
        <View style={styles.header}>
          <BackHeader
            leftIcon="arrow-back-outline"
            onLeftPress={props.onBackDropPress}
            centerText="Messages"
            leftIconColor={theme === 'dark' ? 'white' : 'black'}
            centerTextColor={theme === 'dark' ? 'white' : 'black'}
          />
        </View>
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
  header: {},
});

export default GroupInfoModal;
