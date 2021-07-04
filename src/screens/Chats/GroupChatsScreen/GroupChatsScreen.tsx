import {Layout} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import GroupChatHeader from '../../../components/Headers/GroupChatHeader/GroupChatHeader';
import GroupChat from '../../../components/Messages/GroupChat';
import {CHAT_HOME_SCREEN} from '../../../constants/Navigation/Navigation';
import useGetMessages from '../../../hooks/Messages/Chat/useGetMessages';
import {RootState} from '../../../store/rootReducer';

const GroupChatsScreen = (props: any) => {
  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const {messages, handleSend, isMoreLoading, lastDoc, loadMore} =
    useGetMessages(props.route.params.group);

  //On user back button move to chat home screen
  useEffect(() => {
    const unsubscribe = props.navigation.addListener(
      'beforeRemove',
      (e: any) => {
        e.preventDefault();
        unsubscribe();
        props.navigation.navigate(CHAT_HOME_SCREEN); //Navigate to Chat home screen
      },
    );
  }, []);

  return (
    <Layout level="1" style={styles.main}>
      <View style={styles.header}>
        <GroupChatHeader
          groupDetails={props.route.params.group}
          onPressLeft={() => props.navigation.navigate(CHAT_HOME_SCREEN)}
          onPressHeader={() => console.log('Open Details')}
          myUid={firebaseUser.uid}
          theme={theme}
        />
      </View>
      <GroupChat
        message={messages}
        handleSend={handleSend}
        isMoreLoading={isMoreLoading}
        lastDoc={lastDoc}
        loadMore={loadMore}
        group={props.group}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 0.3,
    borderColor: 'grey',
    position: 'absolute',
    top: 0,
    zIndex: 2,
    width: '100%',
  },
});

export default GroupChatsScreen;
