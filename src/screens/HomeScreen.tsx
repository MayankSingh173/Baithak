import React from 'react';
import {Text, Layout} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/rootReducer';
import {updateTheme} from '../store/theme/actionCreator/updateTheme';

const HomeScreen = () => {
  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );
  const storeDispatch = useDispatch();
  return (
    <Layout
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      level="1">
      <Text
        onPress={() =>
          storeDispatch(updateTheme(theme === 'dark' ? 'light' : 'dark'))
        }>
        Home Screen
      </Text>
    </Layout>
  );
};

export default HomeScreen;
