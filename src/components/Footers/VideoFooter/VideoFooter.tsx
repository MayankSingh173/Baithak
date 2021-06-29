import {Text, Icon, useTheme} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';

interface props {
  onClickMenu: () => void;
  onClickMessage: () => void;
  onClickMic: () => void;
  onClickCamera: () => void;
  endCall: () => void;
  muteVideo: boolean;
  muteAudio: boolean;
}

const VideoFooter = (props: props) => {
  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );
  return (
    <View style={styles.main}>
      <TouchableOpacity
        onPress={props.onClickMenu}
        style={[styles.iconView, {backgroundColor: 'rgba(0, 0, 0, 0.2)'}]}>
        <Icon
          name="more-vertical-outline"
          style={[styles.icon]}
          fill={theme === 'dark' ? 'white' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.onClickCamera}
        style={[styles.iconView, {backgroundColor: 'rgba(0, 0, 0, 0.2)'}]}>
        <Icon
          name={props.muteVideo ? 'video-off-outline' : 'video-outline'}
          style={[styles.icon]}
          fill={theme === 'dark' ? 'white' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.endCall}
        style={[styles.iconView, {backgroundColor: 'red'}]}>
        <Icon
          name="phone-outline"
          style={{width: 35, height: 35}}
          fill="#FFFF"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.onClickMic}
        style={[styles.iconView, {backgroundColor: 'rgba(0, 0, 0, 0.2)'}]}>
        <Icon
          name={props.muteAudio ? 'mic-off-outline' : 'mic-outline'}
          style={[styles.icon]}
          fill={theme === 'dark' ? 'white' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.onClickMenu}
        style={[styles.iconView, {backgroundColor: 'rgba(0, 0, 0, 0.2)'}]}>
        <Icon
          name="message-square-outline"
          style={[styles.icon]}
          fill={theme === 'dark' ? 'white' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
    //  backgroundColor: 'green',
    //   position: 'absolute',
    //   bottom: 0,
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default VideoFooter;
