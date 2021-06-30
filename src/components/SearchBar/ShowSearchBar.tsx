import React from 'react';
import {TouchableOpacity, StyleSheet, ColorSchemeName} from 'react-native';
import {Text, useStyleSheet, useTheme, Icon} from '@ui-kitten/components';
import {RALEWAY_REGULAR} from '../../constants/Fonts/Fonts';

interface props {
  theme: ColorSchemeName;
  onPress: () => void;
}

const ShowSearchBar = (props: props) => {
  const styles = useStyleSheet(themedStyles);
  const themes = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.main,
        {
          backgroundColor:
            props.theme === 'dark'
              ? themes['color-basic-1000']
              : themes['color-basic-300'],
        },
      ]}
      onPress={props.onPress}>
      <Icon
        style={styles.icon}
        name="search-outline"
        fill={props.theme === 'dark' ? 'white' : 'black'}
      />
      <Text style={styles.search}>Search...</Text>
    </TouchableOpacity>
  );
};

const themedStyles = StyleSheet.create({
  main: {
    borderRadius: 30,
    padding: 8,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  icon: {
    height: 30,
    width: 30,
  },
  search: {
    fontFamily: RALEWAY_REGULAR,
    marginLeft: 10,
    marginTop: '1%',
    color: '#B3B3B3',
  },
});
export default ShowSearchBar;
