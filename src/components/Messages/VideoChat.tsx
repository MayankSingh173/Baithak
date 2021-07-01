import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Layout, useTheme, Icon} from '@ui-kitten/components';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/rootReducer';
import {
  GiftedChat,
  Send,
  InputToolbar,
  Composer,
  Bubble,
  Actions,
  IMessage,
} from 'react-native-gifted-chat';
import {Baithak} from '../../models/Meeting/CreateMeeting/interface';
import {onDeleteMessage} from '../../utils/Messages/onDeleteMessage';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';
import {RALEWAY_MEDIUM} from '../../constants/Fonts/Fonts';

interface props {
  message: IMessage[];
  handleSend: (mssgs: IMessage[]) => Promise<void>;
  isMoreLoading: boolean;
  loadMore: any;
  lastDoc: FirebaseFirestoreTypes.DocumentData | undefined;
  baithak: Baithak;
}

const customtInputToolbar = (props: any, color: string) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={[styles.input, {backgroundColor: color}]}
    />
  );
};

const renderBubble = (
  props: any,
  rightBubbleColor: string,
  leftBubbleColor: string,
) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: leftBubbleColor,
        },
        right: {
          backgroundColor: rightBubbleColor,
        },
      }}
    />
  );
};

const renderComposer = (props: any, textColor: string) => {
  return (
    <Composer
      {...props}
      textInputStyle={[styles.inputStyles, {color: textColor}]}
    />
  );
};

const renderLoading = (color: string) => {
  return (
    <View style={styles.activity}>
      <ActivityIndicator color={color} size="large" />
    </View>
  );
};

const renderAction = (props: any) => {
  return <Actions {...props} containerStyle={styles.plus} />;
};

const renderSend = (props: any, color: string, sendColor: string) => {
  return (
    <Send {...props}>
      <View style={[styles.sendingContainer, {backgroundColor: sendColor}]}>
        <Icon name="arrow-forward" height={30} width={30} fill={color} />
      </View>
    </Send>
  );
};

const onLongPress = (
  context: any,
  message: IMessage,
  baithakId: string,
  uid: string,
) => {
  const options = ['Delete Message', 'Copy Text', 'Cancel'];
  const cancelButtonIndex = options.length - 1;
  context.actionSheet().showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
    },
    async (buttonIndex: number) => {
      switch (buttonIndex) {
        case 0:
          await onDeleteMessage(message, baithakId, uid);
          break;
        case 1:
          Clipboard.setString(message.text);
          Toast.show({
            type: 'success',
            text1: 'Copied!',
            position: 'top',
          });
          break;
      }
    },
  );
};

const VideoChat = (props: props) => {
  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const appTheme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const theme = useTheme();
  return (
    <Layout style={styles.main}>
      <GiftedChat
        messages={props.message}
        user={{_id: firebaseUser.uid}}
        onSend={props.handleSend}
        renderAvatarOnTop
        renderUsernameOnMessage
        scrollToBottom
        alwaysShowSend
        infiniteScroll
        isLoadingEarlier={props.isMoreLoading}
        onLoadEarlier={props.loadMore}
        bottomOffset={0}
        loadEarlier={props.lastDoc ? true : false}
        renderLoading={() => renderLoading(theme['color-primary-default'])}
        renderInputToolbar={(props1) =>
          customtInputToolbar(
            props1,
            appTheme === 'dark'
              ? theme['color-basic-900']
              : theme['color-basic-600'],
          )
        }
        renderSend={(props2) =>
          renderSend(
            props2,
            theme['color-primary-default'],
            appTheme === 'dark'
              ? theme['color-basic-700']
              : theme['color-basic-200'],
          )
        }
        renderComposer={(props3) =>
          renderComposer(props3, appTheme === 'dark' ? 'white' : 'black')
        }
        onPressAvatar={(item) => console.log('Press on avatar', item)}
        renderBubble={(props4) =>
          renderBubble(
            props4,
            appTheme === 'dark'
              ? theme['color-basic-700']
              : theme['color-basic-400'],
            theme['color-primary-default'],
          )
        }
        renderActions={(props5) => renderAction(props5)}
        onPressActionButton={() => console.log('Plus')}
        onLongPress={(context, message) =>
          onLongPress(
            context,
            message,
            `${props.baithak.meetId}${props.baithak.password}`,
            firebaseUser.uid,
          )
        }
      />
    </Layout>
  );
};

export default VideoChat;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingBottom: 10,
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 30,
    marginRight: -10,
    elevation: 2,
  },
  input: {
    padding: 5,
    paddingLeft: 15,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  inputStyles: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: RALEWAY_MEDIUM,
  },
  plus: {
    marginLeft: 0,
  },
});
