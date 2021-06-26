import {Layout, Button, Text, useTheme} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import GeneralHeader from '../../../components/Headers/GeneralHeader/GeneralHeader';
import {PROFILE_SCREEN} from '../../../constants/Navigation/Navigation';
import {RootState} from '../../../store/rootReducer';
import {RALEWAY_BOLD, RALEWAY_REGULAR} from '../../../constants/Fonts/Fonts';
import LottieView from 'lottie-react-native';
import {MeetIcon} from '../../../components/Icons/Icons';
import SelectMeet from '../../../components/Modals/SelectMeet/SelectMeet';

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
        onJoinMeet={() => console.log('join meet')}
        onCreateMeet={() => console.log('create meet')}
      />
      <GeneralHeader
        firebaseUser={firebaseUser}
        heading="Meet"
        rightIcon="settings-outline"
        onPressLeft={() => props.navigation.navigate(PROFILE_SCREEN)}
        onPressRight={() => console.log('Move to Settings Screen')}
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
          Start a meeting
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
    padding: 10,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  image: {
    width: 210,
    height: 210,
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
