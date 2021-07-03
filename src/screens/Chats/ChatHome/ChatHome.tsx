import {Layout, Text, useTheme} from '@ui-kitten/components';
import React, {useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import GeneralHeader from '../../../components/Headers/GeneralHeader/GeneralHeader';
import SelectMeet from '../../../components/Modals/SelectMeet/SelectMeet';
import {
  RALEWAY_BOLD,
  RALEWAY_MEDIUM,
  RALEWAY_REGULAR,
} from '../../../constants/Fonts/Fonts';
import {
  CREATE_MEET_SCREEN,
  JOIN_MEET_SCREEN,
  PROFILE_SCREEN,
  USER_ADD_SEARCH_SCREEN,
  USER_SEARCH_SCREEN,
} from '../../../constants/Navigation/Navigation';
import {RootState} from '../../../store/rootReducer';
import LottieView from 'lottie-react-native';
import {screenHeight} from '../../../constants/screen/screenInfo';
import CreateGroupButton from '../../../components/Buttons/CreateGroupButton/CreateGroupButton';
import useGetGroups from '../../../hooks/Messages/Chat/useGetGroups';

const ChatHome = (props: any) => {
  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const {selectMeet, setSelectMeet, loading, groups, setNewMembers} =
    useGetGroups(firebaseUser.uid);

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
      />
      <GeneralHeader
        firebaseUser={firebaseUser}
        heading="Chat"
        rightIcon="video-outline"
        onPressLeft={() => props.navigation.navigate(PROFILE_SCREEN)}
        onPressRight={() => props.navigation.navigate(CREATE_MEET_SCREEN)}
        onPressSearch={() => props.navigation.navigate(USER_SEARCH_SCREEN)}
      />
      <CreateGroupButton
        onPress={() => props.navigation.navigate(USER_ADD_SEARCH_SCREEN)}
      />
      {loading ? (
        <Layout style={[styles.main, styles.center]}>
          <ActivityIndicator
            size="large"
            color={appTheme['color-primary-default']}
          />
        </Layout>
      ) : (
        <View style={styles.container}>
          {groups?.length === 0 ? (
            <>
              <View style={styles.imageView}>
                <LottieView
                  source={require('../../../assets/Animations/chat.json')}
                  autoPlay
                  loop
                  style={styles.image}
                />
              </View>
              <Text category="h6" style={styles.chatHeading}>
                Chat with your friends
              </Text>
              <Text category="s1" style={styles.noMessg}>
                No messages as of Now
              </Text>
            </>
          ) : null}
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // padding: 10,
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
  chatHeading: {
    fontFamily: RALEWAY_BOLD,
    marginTop: 20,
  },
  noMessg: {
    fontFamily: RALEWAY_MEDIUM,
    color: 'grey',
    marginTop: 5,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatHome;
