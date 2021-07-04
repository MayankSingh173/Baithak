import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Text} from '@ui-kitten/components';
import {UserInterface} from '../../../models/User/User';
import SelectedMemberCard from '../../Card/SelectedMemberCard/SelectedMemberCard';
import FullDivider from '../../Divider/FullDivider';

interface props {
  members: UserInterface[];
  myUid: string;
}

const SelectedMembers = (props: props) => {
  if (props.members.length === 1) return null;

  const firebaseUserRemoved = props.members.filter(
    (member) => member.uid !== props.myUid,
  );

  return (
    <View style={styles.main}>
      <FlatList
        horizontal={true}
        data={firebaseUserRemoved}
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
