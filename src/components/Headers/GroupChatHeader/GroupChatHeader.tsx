import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Group} from '../../../models/Messages/interface';
import {Text, Icon, Layout} from '@ui-kitten/components';
import {getGroupDetails} from '../../../utils/Messages/Group/getGroupDetails';
import {RALEWAY_BOLD} from '../../../constants/Fonts/Fonts';
import {getMembersName} from '../../../utils/Messages/Group/getMembersName';
import {getRefinedText} from '../../../utils/Miscellaneous/utils';
import FastImage from 'react-native-fast-image';
import {
  CREATE_MEET_SCREEN,
  REMOTE_USER_PROFILE_SCREEN,
} from '../../../constants/Navigation/Navigation';

interface props {
  groupDetails: Group;
  onPressLeft: () => void;
  myUid: string;
  theme: 'light' | 'dark';
  navigation: any;
  onPressHeader: () => void;
}
const GroupChatHeader = (props: props) => {
  const {groupImage, groupName, otherPersonId} = getGroupDetails(
    props.groupDetails,
    props.myUid,
  );

  const onPressHeader = () => {
    if (props.groupDetails.isDM) {
      props.navigation.navigate(REMOTE_USER_PROFILE_SCREEN, {
        myProfile: false,
        uid: otherPersonId,
      });
    } else props.onPressHeader();
  };

  return (
    <Layout
      level="2"
      style={[
        styles.main,
        {paddingVertical: props.groupDetails.isDM ? 10 : 5},
      ]}>
      <TouchableOpacity onPress={props.onPressLeft}>
        <Icon
          name="arrow-back-outline"
          style={styles.icon}
          fill={props.theme === 'dark' ? 'white' : 'black'}
        />
      </TouchableOpacity>
      <View style={styles.imgView}>
        <FastImage source={{uri: groupImage}} style={styles.image} />
      </View>
      <TouchableOpacity style={styles.content} onPress={onPressHeader}>
        <View style={styles.heading}>
          <Text style={styles.name}>{getRefinedText(groupName, 24)}</Text>
          {!props.groupDetails.isDM && (
            <Text appearance="hint" category="p2" style={styles.name}>
              {getMembersName(props.groupDetails.membersDetails, 30)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.rightIconView}
        onPress={() =>
          props.navigation.navigate(CREATE_MEET_SCREEN, {
            groupId: props.groupDetails.groupId,
          })
        }>
        <Icon
          name="video-outline"
          fill={props.theme === 'dark' ? 'white' : 'black'}
          style={styles.icon}
        />
      </TouchableOpacity>
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
    marginLeft: 10,
  },
  content: {
    flexDirection: 'row',
    paddingVertical: 10,
    flex: 5,
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
    alignItems: 'center',
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 50,
    elevation: 10,
  },
});
export default GroupChatHeader;
