import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Layout, useStyleSheet, Text, Icon} from '@ui-kitten/components';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';
import {RALEWAY_BOLD, RALEWAY_MEDIUM} from '../../../constants/Fonts/Fonts';
import {optionProp} from '../../../models/Meeting/CreateMeeting/interface';
import FullDivider from '../../Divider/FullDivider';

interface props {
  modalVisible: boolean;
  onBackDropPress: () => void;
  onCreateMeet: () => void;
  onJoinMeet: () => void;
}

const SelectMeet = (props: props) => {
  const styles = useStyleSheet(themedStyles);

  const options: optionProp[] = [
    {
      icon: 'plus-circle-outline',
      onPress: props.onCreateMeet,
      text: 'Create Baithak',
    },
    {
      icon: 'video-outline',
      onPress: props.onJoinMeet,
      text: 'Join Baithak',
    },
  ];

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );
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
            Want to start Baithak ?
          </Text>
          {options.map((option, index) => {
            return (
              <TouchableOpacity
                style={styles.option}
                onPress={option.onPress}
                key={index}>
                <Icon style={styles.icon} name={option.icon} fill={'#45F1DE'} />
                <Text
                  style={[
                    styles.createMeet,
                    {color: theme === 'dark' ? '#D4D4D4' : 'black'},
                  ]}>
                  {option.text}
                </Text>
              </TouchableOpacity>
            );
          })}
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
});

export default SelectMeet;
