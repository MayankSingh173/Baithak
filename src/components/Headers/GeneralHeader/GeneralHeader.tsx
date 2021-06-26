import React, {FC} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  useStyleSheet,
  Avatar,
  Text,
  Icon,
  useTheme,
} from '@ui-kitten/components';
import {UserInterface} from '../../../models/User/User';
import {RALEWAY_BOLD, RALEWAY_MEDIUM} from '../../../constants/Fonts/Fonts';
import {DEFAULT_AVATAR} from '../../../constants/Images/Images';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/rootReducer';
import ShowSearchBar from '../../SearchBar/ShowSearchBar';

interface props {
  firebaseUser: UserInterface;
  heading: string;
  onPressLeft: () => void;
  onPressRight?: () => void;
  rightIcon?: string;
}
const GeneralHeader: FC<props> = ({
  firebaseUser,
  heading,
  rightIcon,
  onPressLeft,
  onPressRight,
}) => {
  const theme = useTheme();
  const appTheme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const styles = useStyleSheet(themedStyles);
  return (
    <View
      style={[
        styles.main,
        {borderColor: appTheme === 'dark' ? theme['color-basic-700'] : 'black'},
      ]}>
      <View style={styles.firstRow}>
        <TouchableOpacity style={styles.avatarView} onPress={onPressLeft}>
          <Avatar
            source={{
              uri: firebaseUser.photoURL
                ? firebaseUser.photoURL
                : DEFAULT_AVATAR,
            }}
          />
        </TouchableOpacity>
        <View style={styles.headingView}>
          <Text category="h5" style={styles.heading}>
            {heading}
          </Text>
        </View>
        {rightIcon && (
          <TouchableOpacity style={styles.iconView} onPress={onPressRight}>
            <Icon
              name={rightIcon}
              style={styles.icon}
              fill={appTheme === 'dark' ? 'white' : 'black'}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.searchBarView}>
        <ShowSearchBar theme={appTheme} onPress={() => console.log('Search')} />
      </View>
    </View>
  );
};

const themedStyles = StyleSheet.create({
  main: {
    marginTop: 10,
    borderBottomWidth: 0.3,
  },
  firstRow: {
    flexDirection: 'row',
    width: '100%',
  },
  heading: {
    fontFamily: RALEWAY_BOLD,
  },
  avatarView: {
    width: '15%',
    marginLeft: 15,
  },
  headingView: {
    width: '68%',
    justifyContent: 'center',
    //  alignItems: 'center',
  },
  iconView: {
    width: '30%',
    alignSelf: 'center',
    marginLeft: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  searchBarView: {
    padding: 10,
    paddingHorizontal: 5,
    marginVertical: 6,
  },
});

export default GeneralHeader;
