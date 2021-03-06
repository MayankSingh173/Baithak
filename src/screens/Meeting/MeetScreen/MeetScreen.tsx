import {Layout, Button, Text, useTheme} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import GeneralHeader from '../../../components/Headers/GeneralHeader/GeneralHeader';
import {
  CREATE_MEET_SCREEN,
  JOIN_MEET_SCREEN,
  PROFILE_SCREEN,
  SCHEDULE_MEET_SCREEN,
  USER_SEARCH_SCREEN,
} from '../../../constants/Navigation/Navigation';
import {RootState} from '../../../store/rootReducer';
import {RALEWAY_BOLD, RALEWAY_REGULAR} from '../../../constants/Fonts/Fonts';
import LottieView from 'lottie-react-native';
import {MeetIcon} from '../../../components/Icons/Icons';
import SelectMeet from '../../../components/Modals/SelectMeet/SelectMeet';
import {screenHeight} from '../../../constants/screen/screenInfo';
import ModalActivityIndicator from '../../../components/Modals/ModalActivityIndicator/ModalActivityIndicator';

const MeetScreen = (props: any) => {
  const [selectMeet, setSelectMeet] = useState<boolean>(false);

  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const appTheme = useTheme();

  return (
    <Layout level="1" style={styles.main}>
      <SelectMeet
        modalVisible={selectMeet}
        onBackDropPress={() => setSelectMeet(!selectMeet)}
        onJoinMeet={() => {
          setSelectMeet(!selectMeet);
          props.navigation.navigate(JOIN_MEET_SCREEN);
        }}
        onCreateMeet={() => {
          setSelectMeet(!selectMeet);
          props.navigation.navigate(CREATE_MEET_SCREEN);
        }}
        onScheduleMeet={() => {
          setSelectMeet(!selectMeet);
          props.navigation.navigate(SCHEDULE_MEET_SCREEN);
        }}
      />
      <GeneralHeader
        firebaseUser={firebaseUser}
        heading="Baithak"
        rightIcon="video-outline"
        onPressLeft={() => props.navigation.navigate(PROFILE_SCREEN)}
        onPressRight={() => props.navigation.navigate(CREATE_MEET_SCREEN)}
        onPressSearch={() => props.navigation.navigate(USER_SEARCH_SCREEN)}
      />
      <View style={styles.container}>
        <View style={styles.imageView}>
          <LottieView
            source={require('../../../assets/Animations/meetHome.json')}
            autoPlay
            loop
            style={styles.image}
          />
        </View>
        <Text category="h6" style={styles.startMeet}>
          Start a Baithak
        </Text>
        <Text style={[styles.tagLine, {color: appTheme['color-basic-600']}]}>
          You're friends are waiting for you. Join Now!
        </Text>
        <View style={styles.btnView}>
          <Button
            accessoryLeft={MeetIcon}
            style={styles.joinBtn}
            size="large"
            onPress={() => setSelectMeet(!selectMeet)}>
            Join Now
          </Button>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  image: {
    height: screenHeight - 500,
  },
  imageView: {
    alignItems: 'center',
    width: '100%',
  },
  joinBtn: {
    marginTop: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  startMeet: {
    fontFamily: RALEWAY_BOLD,
    marginTop: 20,
  },
  tagLine: {
    fontFamily: RALEWAY_REGULAR,
    marginTop: 10,
  },
  btnView: {
    flexDirection: 'row',
  },
});

export default MeetScreen;
