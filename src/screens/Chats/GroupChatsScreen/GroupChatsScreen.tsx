import {Layout} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import GroupChatHeader from '../../../components/Headers/GroupChatHeader/GroupChatHeader';
import GroupChat from '../../../components/Messages/GroupChat';
import GroupInfoModal from '../../../components/Modals/GroupInfo/GroupInfoModal';
import ModalActivityIndicator from '../../../components/Modals/ModalActivityIndicator/ModalActivityIndicator';
import {CHAT_HOME_SCREEN} from '../../../constants/Navigation/Navigation';
import useGetMessages from '../../../hooks/Messages/Chat/useGetMessages';
import {RootState} from '../../../store/rootReducer';

const GroupChatsScreen = (props: any) => {
  if (!props.route.params.group) {
    return <ModalActivityIndicator modalVisible={true} />;
  }

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const {
    messages,
    handleSend,
    isMoreLoading,
    lastDoc,
    loadMore,
    groupInfo,
    toggleGroupInfoModal,
  } = useGetMessages(props.route.params.group, props.navigation, firebaseUser);

  return (
    <Layout level="1" style={styles.main}>
      <GroupInfoModal
        modalVisible={groupInfo}
        onBackDropPress={toggleGroupInfoModal}
        group={props.route.params.group}
        navigation={props.navigation}
      />
      <View style={styles.header}>
        <GroupChatHeader
          groupDetails={props.route.params.group}
          onPressLeft={() => props.navigation.navigate(CHAT_HOME_SCREEN)}
          myUid={firebaseUser.uid}
          theme={theme}
          navigation={props.navigation}
          onPressHeader={toggleGroupInfoModal}
        />
      </View>
      <GroupChat
        message={messages}
        handleSend={handleSend}
        isMoreLoading={isMoreLoading}
        lastDoc={lastDoc}
        loadMore={loadMore}
        group={props.route.params.group}
        navigation={props.navigation}
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
