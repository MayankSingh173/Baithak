import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Layout, useStyleSheet, Text, Icon} from '@ui-kitten/components';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';
import {RALEWAY_BOLD, RALEWAY_REGULAR} from '../../../constants/Fonts/Fonts';
import {AddIcon} from '../../Icons/Icons';

interface props {
  modalVisible: boolean;
  onBackDropPress: () => void;
  onCreateMeet: () => void;
  onJoinMeet: () => void;
}

const SelectMeet = (props: props) => {
  const styles = useStyleSheet(themedStyles);

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
          <Layout level="2" style={styles.drop} />
        </View>
        <View style={styles.container}>
          <Text category="h6" style={styles.heading}>
            Want a Meeting?
          </Text>
          <TouchableOpacity style={styles.option} onPress={props.onCreateMeet}>
            <Icon
              style={styles.icon}
              name="plus-circle-outline"
              fill={theme === 'dark' ? '#45F1DE' : 'black'}
            />
            <Text style={[styles.createMeet, {color: '#D4D4D4'}]}>
              Create Meeting
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={props.onJoinMeet}>
            <Icon
              style={styles.icon}
              name="video-outline"
              fill={theme === 'dark' ? '#45F1DE' : 'black'}
            />
            <Text style={[styles.createMeet, {color: '#D4D4D4'}]}>
              Join Meeting
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
    fontFamily: RALEWAY_REGULAR,
    marginLeft: 10,
  },
});

export default SelectMeet;
