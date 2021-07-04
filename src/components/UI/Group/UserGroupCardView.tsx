import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {Text} from '@ui-kitten/components';
import {Group} from '../../../models/Messages/interface';
import FullDivider from '../../Divider/FullDivider';
import GroupCard from '../../Card/GroupCard/GroupCard';

interface props {
  userGroups: Group[];
  myUid: string;
  onPressChat: (group: Group) => void;
}
const UserGroupCardView = ({userGroups, myUid, onPressChat}: props) => {
  return (
    <View style={styles.main}>
      <FlatList
        data={userGroups}
        keyExtractor={(group) => group.groupId}
        renderItem={({item}) => {
          return (
            <GroupCard
              onPress={() => onPressChat(item)}
              groupDetails={item}
              myUid={myUid}
            />
          );
        }}
        ItemSeparatorComponent={() => <FullDivider style={styles.divider} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: 20,
  },
  divider: {
    width: '80%',
    alignSelf: 'flex-end',
    marginVertical: 12,
  },
});

export default UserGroupCardView;
