import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface props {
  onPress: () => void;
}

const AddTaskButton = (props: props) => {
  const appTheme = useTheme();

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.main,
        {backgroundColor: appTheme['color-primary-default']},
      ]}>
      <Icon name="add-task" size={30} color="white" />
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
    zIndex: 2,
  },
});

export default AddTaskButton;
