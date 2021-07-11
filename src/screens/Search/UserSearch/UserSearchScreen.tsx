import React from 'react';
import {StyleSheet, View, ActivityIndicator, FlatList} from 'react-native';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import useGetUsers from '../../../hooks/User/useGetUsers';
import UserSearchBar from '../../../components/SearchBar/UserSearchBar';
import {RALEWAY_MEDIUM} from '../../../constants/Fonts/Fonts';
import FullDivider from '../../../components/Divider/FullDivider';
import UserSerchCard from '../../../components/Card/UserSearchCard/UserSerchCard';
import {REMOTE_USER_PROFILE_SCREEN} from '../../../constants/Navigation/Navigation';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';

const UserSearchScreen = (props: any) => {
  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const {filteredUsers, loading, query, handleQuery} = useGetUsers(
    firebaseUser.uid,
  );

  const appTheme = useTheme();

  return (
    <Layout style={styles.main}>
      <UserSearchBar
        query={query}
        handleQuery={handleQuery}
        placeholder="Search..."
        style={{borderRadius: 10, margin: 10}}
        autoFocus={true}
      />
      {loading && !filteredUsers ? (
        <View style={styles.activityView}>
          <ActivityIndicator
            size="large"
            color={appTheme['color-primary-default']}
          />
        </View>
      ) : filteredUsers?.length === 0 ? (
        <View style={styles.activityView}>
          <Text style={styles.noUser}>
            Oops, No user{' '}
            <Text
              category="h6"
              style={[
                styles.noUser,
                {color: appTheme['color-primary-default']},
              ]}>
              Found!!
            </Text>
          </Text>
        </View>
      ) : (
        <View style={styles.listView}>
          <FlatList
            data={filteredUsers}
            keyExtractor={(user) => user.uid}
            renderItem={({item}) => {
              return (
                <UserSerchCard
                  user={item}
                  onPress={() =>
                    props.navigation.navigate(REMOTE_USER_PROFILE_SCREEN, {
                      myProfile: false,
                      uid: item.uid,
                    })
                  }
                />
              );
            }}
            ItemSeparatorComponent={() => (
              <FullDivider style={styles.divider} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
  },
  activityView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUser: {
    fontFamily: RALEWAY_MEDIUM,
  },
  listView: {
    padding: 10,
    flex: 1,
  },
  divider: {
    width: '80%',
    alignSelf: 'flex-end',
    marginVertical: 12,
  },
});

export default UserSearchScreen;
