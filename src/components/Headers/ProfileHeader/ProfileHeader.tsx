import {Icon} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';

interface props {
  myProfile: boolean;
  onPressEdit: () => void;
  onPressSetting: () => void;
}

const ProfileHeader = (props: props) => {
  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  if (!props.myProfile) return null;
  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={props.onPressEdit}>
        <Icon
          name="edit-outline"
          style={styles.icon}
          fill={theme === 'dark' ? 'white' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPressSetting}>
        <Icon
          name="settings-outline"
          style={styles.icon}
          fill={theme === 'dark' ? 'white' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    height: 30,
    width: 30,
    marginHorizontal: 7,
  },
});

export default ProfileHeader;
