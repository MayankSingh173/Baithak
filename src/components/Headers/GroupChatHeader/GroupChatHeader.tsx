import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Group} from '../../../models/Messages/interface';
import {Text, Icon, Avatar, Layout} from '@ui-kitten/components';
import {getGroupDetails} from '../../../utils/Messages/Group/getGroupDetails';
import {RALEWAY_BOLD} from '../../../constants/Fonts/Fonts';
import {getMembersName} from '../../../utils/Messages/Group/getMembersName';
import {getRefinedText} from '../../../utils/Miscellaneous/utils';

interface props {
  groupDetails: Group;
  onPressLeft: () => void;
  onPressHeader: () => void;
  myUid: string;
  theme: 'light' | 'dark';
}
const GroupChatHeader = (props: props) => {
  const {groupImage, groupName} = getGroupDetails(
    props.groupDetails,
    props.myUid,
  );
  return (
    <Layout level="2" style={styles.main}>
      <TouchableOpacity onPress={props.onPressLeft}>
        <Icon
          name="arrow-back-outline"
          style={styles.icon}
          fill={props.theme === 'dark' ? 'white' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.content}>
        <View style={styles.imgView}>
          <Avatar source={{uri: groupImage}} size="large" />
        </View>
        <View style={styles.heading}>
          <Text category="h6" style={styles.name}>
            {getRefinedText(groupName, 20)}
          </Text>
          {!props.groupDetails.isDM && (
            <Text appearance="hint" category="s2" style={styles.name}>
              {getMembersName(props.groupDetails.membersDetails, 30)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      {/* Video Call Icon */}
      <TouchableOpacity style={styles.rightIconView}></TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    height: 25,
    width: 25,
    marginTop: 2,
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
  },
  content: {
    flexDirection: 'row',
    paddingVertical: 10,
    flex: 5,
    marginLeft: 5,
  },
  heading: {
    alignItems: 'flex-start',
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontFamily: RALEWAY_BOLD,
  },
  rightIconView: {
    flex: 1,
  },
});
export default GroupChatHeader;
