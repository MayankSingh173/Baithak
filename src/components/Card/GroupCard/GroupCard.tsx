import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import moment from 'moment';
import {RALEWAY_BOLD, RALEWAY_REGULAR} from '../../../constants/Fonts/Fonts';
import {Group} from '../../../models/Messages/interface';
import {getGroupDetails} from '../../../utils/Messages/Group/getGroupDetails';
import {getRefinedText} from '../../../utils/Miscellaneous/utils';
import {getUnread} from '../../../utils/Messages/Group/handleUnread';
import FastImage from 'react-native-fast-image';

interface props {
  groupDetails: Group;
  onPress: () => void;
  myUid: string;
}

const GroupCard = ({groupDetails, onPress, myUid}: props) => {
  const {groupName, groupImage, lastMessage} = getGroupDetails(
    groupDetails,
    myUid,
  );

  const appTheme = useTheme();

  const unread = getUnread(groupDetails.membersDetails, myUid);
  return (
    <Layout level={unread > 0 ? '2' : '1'} style={styles.card}>
      <View style={styles.main}>
        <View style={styles.imgView}>
          <FastImage source={{uri: groupImage}} style={styles.image} />
        </View>
        <TouchableOpacity style={styles.content} onPress={onPress}>
          <Text style={styles.name}>{getRefinedText(groupName, 25)}</Text>
          {lastMessage && (
            <Text category="s2" style={styles.lastMessage}>
              {getRefinedText(lastMessage.text, 25)}
            </Text>
          )}
          {lastMessage ? (
            <Text appearance="hint" category="s2" style={styles.time}>
              {moment(lastMessage.createdAt).format('h:mm A, DD/MM/YY')}
            </Text>
          ) : (
            <Text appearance="hint" category="s2" style={styles.time}>
              {moment(groupDetails.createdAt).format('h:mm A, DD/MM/YY')}
            </Text>
          )}
        </TouchableOpacity>
        <View style={styles.unreadView}>
          {unread > 0 && (
            <View
              style={[
                styles.unread,
                {backgroundColor: appTheme['color-primary-default']},
              ]}>
              <Text style={{fontFamily: RALEWAY_BOLD, color: 'black'}}>
                {unread}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
  },
  card: {
    borderRadius: 70,
    padding: 10,
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1.4,
  },
  content: {
    flex: 4.5,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  name: {
    fontFamily: RALEWAY_BOLD,
    fontSize: 16,
  },
  time: {
    fontFamily: RALEWAY_REGULAR,
    marginTop: 1,
  },
  lastMessage: {
    fontFamily: RALEWAY_REGULAR,
  },
  unread: {
    borderRadius: 40,
    paddingBottom: 6,
    width: 25,
    height: 25,
    alignItems: 'center',
  },
  unreadView: {
    flex: 0.6,
    justifyContent: 'center',
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 20,
    elevation: 7,
  },
});

export default GroupCard;
