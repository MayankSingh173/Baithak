import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Layout, Text, useTheme, Icon} from '@ui-kitten/components';
import useGetUsers from '../../../hooks/User/useGetUsers';
import UserSearchBar from '../../../components/SearchBar/UserSearchBar';
import {RALEWAY_MEDIUM} from '../../../constants/Fonts/Fonts';
import FullDivider from '../../../components/Divider/FullDivider';
import UserSelectCard from '../../../components/Card/UserSelectCard/UserSelectCard';
import {useState} from 'react';
import {UserInterface} from '../../../models/User/User';
import SelectedMembers from '../../../components/SearchBar/SelectedMembers/SelectedMembers';
import BackHeader from '../../../components/Headers/BackHeader/BackHeader';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';

const UserAddSearchScreen = (props: any) => {
  const {
    filteredUsers,
    loading,
    query,
    handleQuery,
    selectedUsers,
    setSelectedUsers,
    onPressNext,
  } = useGetUsers(props.navigation);
  const appTheme = useTheme();

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const onSelectUser = (user: UserInterface, currCheck: boolean) => {
    if (currCheck) {
      setSelectedUsers((prev) => [...prev, user]);
    } else {
      const updatedUser = selectedUsers.filter((u) => u.uid !== user.uid);
      setSelectedUsers(updatedUser);
    }
  };

  return (
    <Layout style={styles.main}>
      <BackHeader
        leftIcon="arrow-back-outline"
        onLeftPress={() => props.navigation.goBack()}
        centerText="Select People"
        centerTextColor={theme === 'dark' ? 'white' : 'black'}
        leftIconColor={theme === 'dark' ? 'white' : 'black'}
      />
      <UserSearchBar
        query={query}
        handleQuery={handleQuery}
        placeholder="Search..."
        style={{borderRadius: 10, margin: 10, marginTop: 20}}
        autoFocus={false}
      />
      {selectedUsers.length > 0 && (
        <TouchableOpacity
          onPress={onPressNext}
          style={[
            styles.button,
            {backgroundColor: appTheme['color-primary-default']},
          ]}>
          <Icon name="arrow-forward-outline" fill="white" style={styles.icon} />
        </TouchableOpacity>
      )}
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
                <UserSelectCard
                  user={item}
                  onPress={(user, currCheck) => onSelectUser(user, currCheck)}
                />
              );
            }}
            ItemSeparatorComponent={() => (
              <FullDivider style={styles.divider} />
            )}
            ListHeaderComponent={() => (
              <SelectedMembers members={selectedUsers} />
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
  },
  divider: {
    width: '80%',
    alignSelf: 'flex-end',
    marginVertical: 12,
  },
  button: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    padding: 15,
    elevation: 5,
    borderRadius: 30,
    zIndex: 2,
  },
  icon: {
    height: 28,
    width: 28,
  },
});

export default UserAddSearchScreen;
