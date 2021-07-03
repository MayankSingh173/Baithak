import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface props {
  onPress: () => void;
}

const CreateGroupButton = (props: props) => {
  const appTheme = useTheme();

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.main,
        {backgroundColor: appTheme['color-primary-default']},
      ]}>
      <Icon name="addusergroup" size={30} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
    elevation: 5,
  },
});

export default CreateGroupButton;
