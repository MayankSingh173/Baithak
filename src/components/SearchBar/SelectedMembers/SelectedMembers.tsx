import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Text} from '@ui-kitten/components';
import {UserInterface} from '../../../models/User/User';
import SelectedMemberCard from '../../Card/SelectedMemberCard/SelectedMemberCard';
import FullDivider from '../../Divider/FullDivider';

interface props {
  members: UserInterface[];
}

const SelectedMembers = (props: props) => {
  if (props.members.length === 0) return null;

  return (
    <View style={styles.main}>
      <FlatList
        horizontal={true}
        data={props.members}
        keyExtractor={(user) => user.uid}
        renderItem={({item}) => {
          return <SelectedMemberCard user={item} />;
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <FullDivider />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 10,
    paddingTop: 0,
  },
  separator: {
    width: 20,
  },
});

export default SelectedMembers;
