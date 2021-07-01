import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Layout, useStyleSheet, Text, Icon, Toggle} from '@ui-kitten/components';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';
import {RALEWAY_BOLD, RALEWAY_MEDIUM} from '../../../constants/Fonts/Fonts';
import {optionProp} from '../../../models/Meeting/CreateMeeting/interface';
import {useState} from 'react';
import FullDivider from '../../Divider/FullDivider';
import {updateTheme} from '../../../store/theme/actionCreator/updateTheme';

interface props {
  modalVisible: boolean;
  onBackDropPress: () => void;
}

const Settings = (props: props) => {
  const styles = useStyleSheet(themedStyles);

  const storeDispatch = useDispatch();

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const changeTheme = () => {
    storeDispatch(updateTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Modal
      isVisible={props.modalVisible}
      hasBackdrop={true}
      onBackdropPress={props.onBackDropPress}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen={true}
      useNativeDriver
      onBackButtonPress={props.onBackDropPress}>
      <Layout level={theme === 'dark' ? '3' : '1'} style={styles.main}>
        <View style={styles.header}>
          <Layout level={theme === 'dark' ? '2' : '3'} style={styles.drop} />
        </View>
        <View style={styles.container}>
          <Text category="h6" style={styles.heading}>
            Settings
          </Text>
          <FullDivider />
          <View style={styles.modeView}>
            <Text category="h6" style={styles.dark}>
              Dark Mode
            </Text>
            <Toggle checked={theme === 'dark'} onChange={changeTheme} />
          </View>
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
  modeView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  dark: {
    fontFamily: RALEWAY_MEDIUM,
  },
});

export default Settings;
