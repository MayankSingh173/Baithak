import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from '@ui-kitten/components';
import {RALEWAY_MEDIUM} from '../../constants/Fonts/Fonts';
import {SearchIcon} from '../Icons/Icons';

interface props {
  query: string;
  handleQuery: (text: string) => void;
  placeholder: string;
  style: any;
  autoFocus: boolean;
}

const UserSearchBar = ({
  query,
  handleQuery,
  placeholder,
  style,
  autoFocus,
}: props) => {
  return (
    <Input
      textStyle={{fontFamily: RALEWAY_MEDIUM}}
      style={[styles.input, style]}
      status="basic"
      placeholder={placeholder}
      keyboardType="default"
      accessoryLeft={SearchIcon}
      value={query}
      onChangeText={(text) => handleQuery(text)}
      size="large"
      autoFocus={autoFocus}
    />
  );
};

const styles = StyleSheet.create({
  input: {},
});

export default UserSearchBar;
