import React from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {Icon, Text, useTheme} from '@ui-kitten/components';
import {RALEWAY_BOLD, RALEWAY_MEDIUM} from '../../../constants/Fonts/Fonts';
import FullDivider from '../../Divider/FullDivider';
import {UserInterface} from '../../../models/User/User';
import ParticipantCard from '../../Card/ParticipantCard/ParticipantCard';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';

interface props {
  onPressAdd: () => void;
  selectedMembers: UserInterface[];
  onRemoveMember: (uid: string) => void;
}

const AddParticipants = (props: props) => {
  const appTheme = useTheme();

  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const renderItems = ({item}: any) => {
    return item.uid !== firebaseUser.uid ? (
      <ParticipantCard user={item} onPressCross={props.onRemoveMember} />
    ) : null;
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text category="h6" style={styles.headerTxt}>
          Add Participants
        </Text>
        <TouchableOpacity onPress={props.onPressAdd}>
          <Icon
            name="plus-square-outline"
            fill={appTheme['color-primary-default']}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <FullDivider />
      <View style={styles.membersView}>
        {props.selectedMembers.length === 1 ? (
          <Text appearance="hint" style={styles.no}>
            No Participants Selected
          </Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={props.selectedMembers}
            keyExtractor={(item) => item.uid}
            renderItem={renderItems}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingVertical: 10,
    marginTop: 20,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTxt: {
    fontFamily: RALEWAY_BOLD,
  },
  icon: {
    height: 25,
    width: 25,
  },
  membersView: {
    marginTop: 10,
  },
  no: {
    fontFamily: RALEWAY_MEDIUM,
  },
  separator: {
    height: 10,
  },
});

export default AddParticipants;
