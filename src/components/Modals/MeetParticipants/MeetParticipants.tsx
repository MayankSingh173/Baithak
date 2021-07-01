import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Layout, useStyleSheet, Text, Icon} from '@ui-kitten/components';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';
import {RALEWAY_BOLD, RALEWAY_MEDIUM} from '../../../constants/Fonts/Fonts';
import FullDivider from '../../Divider/FullDivider';
import {MembersDetails} from '../../../models/Meeting/CreateMeeting/interface';
import {FlatList} from 'react-native-gesture-handler';
import {screenWidth} from '../../../constants/screen/screenInfo';
import FastImage from 'react-native-fast-image';

interface props {
  modalVisible: boolean;
  onBackDropPress: () => void;
  participants: MembersDetails[] | undefined;
}

const MeetParticpants = (props: props) => {
  if (!props.participants) return null;

  const styles = useStyleSheet(themedStyles);

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.imgView}>
        <FastImage
          style={{height: 60, width: 60, borderRadius: 20}}
          source={{uri: item.imageUrl}}
        />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    );
  };

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
          <Text category="h6" style={styles.heading}>
            Participants
          </Text>
          <FullDivider />
          {props.participants.length === 0 ? (
            <Text style={styles.no}>Oops! No one is there</Text>
          ) : (
            <View style={styles.partiView}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={props.participants}
                renderItem={renderItem}
                numColumns={3}
                keyExtractor={(item) => item.agoraId}
                ItemSeparatorComponent={() => <View style={{height: 15}} />}
              />
            </View>
          )}
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
    marginBottom: 5,
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
  imgView: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: (screenWidth - 30) / 3,
    margin: 1,
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 20,
  },
  partiView: {
    marginTop: 20,
  },
  name: {
    fontFamily: RALEWAY_MEDIUM,
    marginTop: 5,
  },
  no: {
    alignSelf: 'center',
    fontFamily: RALEWAY_MEDIUM,
    marginTop: 20,
  },
});

export default MeetParticpants;
