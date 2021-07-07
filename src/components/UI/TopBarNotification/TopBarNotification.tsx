import React, {FC, useEffect} from 'react';
import {View, StyleSheet, Animated, Image} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {screenWidth} from '../../../constants/screen/screenInfo';
import FastImage from 'react-native-fast-image';
import {
  RALEWAY_EXTRA_BOLD,
  RALEWAY_MEDIUM,
} from '../../../constants/Fonts/Fonts';

interface props {
  data: any;
  removeNotification: any;
}

const TopBarNotification: FC<props> = ({data, removeNotification}) => {
  if (!data) return null;

  const state = {offset: new Animated.Value(-200)};

  useEffect(() => {
    Animated.sequence([
      Animated.delay(-220),
      Animated.spring(state.offset, {
        tension: -5,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(state.offset, {
        duration: 1000,
        toValue: -220,
        useNativeDriver: true,
      }),
    ]).start(() => removeNotification());
  }, [state.offset, removeNotification]);

  return (
    <View style={styles.notificationsContainerStyle}>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [
              {
                translateY: state.offset,
              },
            ],
          },
        ]}>
        <Layout level="2" style={styles.messageContainerStyle}>
          <View style={styles.imageView}>
            <FastImage
              source={{uri: data.imageURL}}
              style={styles.avatarStyle}
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.body}>{data.body}</Text>
          </View>
        </Layout>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationsContainerStyle: {
    position: 'absolute',
    width: screenWidth,
  },
  messageContainerStyle: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'flex-end',
    flex: 1,
    borderBottomWidth: 0.3,
  },
  imageView: {
    flex: 1.3,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  avatarStyle: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  textView: {
    flex: 4,
    justifyContent: 'center',
  },
  title: {
    fontFamily: RALEWAY_EXTRA_BOLD,
  },
  body: {
    fontFamily: RALEWAY_MEDIUM,
    marginTop: 3,
  },
  content: {
    width: screenWidth,
  },
});

export default TopBarNotification;
