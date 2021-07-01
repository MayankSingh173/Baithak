import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Layout, useStyleSheet, Text, Icon, Input} from '@ui-kitten/components';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';
import {
  RALEWAY_BOLD,
  RALEWAY_MEDIUM,
  RALEWAY_REGULAR,
} from '../../../constants/Fonts/Fonts';
import FullDivider from '../../Divider/FullDivider';
import {VideoStreamParams} from '../../../models/Meeting/CreateMeeting/interface';

interface props {
  modalVisible: boolean;
  onBackDropPress: () => void;
  onShare: () => void;
  meetConfig: VideoStreamParams;
}

const MeetInfo = (props: props) => {
  const styles = useStyleSheet(themedStyles);

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={() => console.log('Copied')}>
      <Icon {...props} name="copy-outline" />
    </TouchableWithoutFeedback>
  );

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
      <Layout level={theme === 'dark' ? '3' : '1'} style={styles.main}>
        <View style={styles.header}>
          <Layout level={theme === 'dark' ? '2' : '3'} style={styles.drop} />
        </View>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text category="h6" style={styles.heading}>
              {props.meetConfig.channelName}
            </Text>
            <TouchableOpacity onPress={props.onShare}>
              <Icon
                style={{width: 30, height: 30}}
                name="share-outline"
                fill={theme === 'dark' ? '#FFFF' : 'black'}
              />
            </TouchableOpacity>
          </View>
          <FullDivider />
          {props.meetConfig.description ? (
            <Text category="s1" style={styles.descp}>
              {props.meetConfig.description}
            </Text>
          ) : null}
          <Input
            label="Baithak Id"
            style={styles.input}
            accessoryRight={renderIcon}
            disabled={true}
            placeholder={props.meetConfig.meetId}
            size="large"
          />
          <Input
            label="Password"
            style={styles.input}
            accessoryRight={renderIcon}
            disabled={true}
            placeholder={props.meetConfig.password}
            size="large"
          />
          <TouchableOpacity
            style={styles.option}
            onPress={props.onBackDropPress}>
            <Icon
              style={{width: 30, height: 30}}
              name="close-outline"
              fill={theme === 'dark' ? '#FFFF' : 'black'}
            />
            <Text
              style={[
                styles.createMeet,
                {color: theme === 'dark' ? '#D4D4D4' : 'black'},
              ]}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Layout>
    </Modal>
  );
};

const themedStyles = StyleSheet.create({
  main: {
    margin: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 20,
  },
  modal: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-end',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  drop: {
    width: 50,
    height: 10,
    borderRadius: 20,
  },
  container: {
    padding: 20,
    paddingBottom: 0,
  },
  heading: {
    fontFamily: RALEWAY_BOLD,
    paddingRight: 10,
  },
  icon: {
    height: 25,
    width: 25,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  createMeet: {
    fontFamily: RALEWAY_MEDIUM,
    marginLeft: 10,
  },
  descp: {
    fontFamily: RALEWAY_REGULAR,
    marginVertical: 10,
  },
  input: {
    margin: 2,
    marginVertical: 10,
  },
});

export default MeetInfo;
