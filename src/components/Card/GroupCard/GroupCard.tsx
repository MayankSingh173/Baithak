import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Avatar, Text} from '@ui-kitten/components';
import moment from 'moment';
import {
  RALEWAY_BOLD,
  RALEWAY_MEDIUM,
  RALEWAY_REGULAR,
} from '../../../constants/Fonts/Fonts';
import {Group} from '../../../models/Messages/interface';
import {getGroupDetails} from '../../../utils/Messages/Group/getGroupDetails';
import {getRefinedText} from '../../../utils/Miscellaneous/utils';

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

  return (
    <TouchableOpacity style={styles.main} onPress={onPress}>
      <View style={styles.imgView}>
        <Avatar source={{uri: groupImage}} size="giant" />
      </View>
      <View style={styles.content}>
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    flex: 4,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  name: {
    fontFamily: RALEWAY_BOLD,
    fontSize: 17,
  },
  time: {
    fontFamily: RALEWAY_REGULAR,
    marginTop: 1,
  },
  lastMessage: {
    fontFamily: RALEWAY_REGULAR,
  },
});

export default GroupCard;
