import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Group} from '../../../models/Messages/interface';
import FullDivider from '../../Divider/FullDivider';
import GroupCard from '../../Card/GroupCard/GroupCard';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useTheme} from '@ui-kitten/components';

interface props {
  userGroups: Group[];
  myUid: string;
  onPressChat: (group: Group) => void;
  nextPage: () => void;
  lastDoc: FirebaseFirestoreTypes.DocumentData | undefined;
  isMoreLoading: boolean;
}
const UserGroupCardView = ({
  userGroups,
  myUid,
  onPressChat,
  nextPage,
  lastDoc,
  isMoreLoading,
}: props) => {
  const appTheme = useTheme();

  return (
    <View style={styles.main}>
      <FlatList
        onEndReachedThreshold={0.15}
        showsVerticalScrollIndicator={false}
        data={userGroups}
        keyExtractor={(item, index) => `${item.groupId}-${index}`}
        onEndReached={nextPage}
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
        ListFooterComponent={
          lastDoc && isMoreLoading ? (
            <View style={styles.bottomElement}>
              <ActivityIndicator
                size="small"
                color={appTheme['color-primary-default']}
              />
            </View>
          ) : null
        }
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
    marginVertical: 5,
    marginRight: 10,
  },
  bottomElement: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserGroupCardView;
