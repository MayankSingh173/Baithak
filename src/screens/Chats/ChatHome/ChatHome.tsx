import {Layout, Text, useTheme} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import GeneralHeader from '../../../components/Headers/GeneralHeader/GeneralHeader';
import {RALEWAY_BOLD, RALEWAY_REGULAR} from '../../../constants/Fonts/Fonts';
import {
  CREATE_GROUP_SCREEN,
  CREATE_MEET_SCREEN,
  GROUP_CHAT_SCREEN,
  PROFILE_SCREEN,
  USER_ADD_SEARCH_SCREEN,
  USER_SEARCH_SCREEN,
} from '../../../constants/Navigation/Navigation';
import {RootState} from '../../../store/rootReducer';
import CreateGroupButton from '../../../components/Buttons/CreateGroupButton/CreateGroupButton';
import useGetGroups from '../../../hooks/Messages/Group/useGetGroups';
import NoChatsHome from '../../../components/UI/Chats/NoChatsHome';
import UserGroupCardView from '../../../components/UI/Group/UserGroupCardView';
import {Group} from '../../../models/Messages/interface';

const ChatHome = (props: any) => {
  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  //Custom hook for fetching groups in which current user is preset
  const {fetched, groups, lastDoc, isMoreLoading, nextPage} = useGetGroups(
    firebaseUser.uid,
  );

  const appTheme = useTheme();

  const onPressChat = (group: Group) => {
    props.navigation.navigate(GROUP_CHAT_SCREEN, {group: group});
  };

  return (
    <Layout level="1" style={styles.main}>
      <GeneralHeader
        firebaseUser={firebaseUser}
        heading="Chat"
        rightIcon="video-outline"
        onPressLeft={() =>
          props.navigation.navigate(PROFILE_SCREEN, {
            myProfile: true,
            uid: firebaseUser.uid,
          })
        }
        onPressRight={() => props.navigation.navigate(CREATE_MEET_SCREEN)}
        onPressSearch={() => props.navigation.navigate(USER_SEARCH_SCREEN)}
      />
      <CreateGroupButton
        onPress={() =>
          //moven to screen where the user can select the members for the group
          props.navigation.navigate(USER_ADD_SEARCH_SCREEN, {
            toScreen: CREATE_GROUP_SCREEN,
          })
        }
      />
      {!fetched ? (
        <Layout style={[styles.main, styles.center]}>
          <ActivityIndicator
            size="large"
            color={appTheme['color-primary-default']}
          />
        </Layout>
      ) : (
        <View style={styles.container}>
          {groups.length === 0 ? (
            <NoChatsHome />
          ) : (
            <UserGroupCardView
              userGroups={groups}
              myUid={firebaseUser.uid}
              onPressChat={onPressChat}
              lastDoc={lastDoc}
              isMoreLoading={isMoreLoading}
              nextPage={nextPage}
            />
          )}
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatHome;
