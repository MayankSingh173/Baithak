import React from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import {Group} from '../../../models/Messages/interface';
import FullDivider from '../../Divider/FullDivider';
import GroupCard from '../../Card/GroupCard/GroupCard';

interface props {
  userGroups: Group[];
  myUid: string;
  onPressChat: (group: Group) => void;
}
const UserGroupCardView = ({userGroups, myUid, onPressChat}: props) => {
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const wait = (timeout: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefreshList = React.useCallback(() => {
    setRefreshing(true);
    wait(20).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.main}>
      <FlatList
        data={userGroups}
        keyExtractor={(group) => group.groupId}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshList} />
        }
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
    margin: 10,
  },
  divider: {
    width: '78%',
    alignSelf: 'flex-end',
    marginVertical: 2,
    marginRight: 10,
  },
});

export default UserGroupCardView;
