import {Layout, useTheme} from '@ui-kitten/components';
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {useSelector} from 'react-redux';
import AddTaskButton from '../../components/Buttons/AddTaskButton/AddTaskButton';
import CalendarCard from '../../components/Card/CalendarCard/CalendarCard';
import FullDivider from '../../components/Divider/FullDivider';
import GeneralHeader from '../../components/Headers/GeneralHeader/GeneralHeader';
import {
  ADD_TASK_SCREEN,
  CREATE_MEET_SCREEN,
  PROFILE_SCREEN,
  USER_SEARCH_SCREEN,
} from '../../constants/Navigation/Navigation';
import useFetchUserTask from '../../hooks/Task/useFetchUserTask';
import {RootState} from '../../store/rootReducer';

const ActivityScreen = (props: any) => {
  const firebaseUser = useSelector(
    (reduxState: RootState) => reduxState.UserReducer.firebaseUser,
  );

  const theme = useSelector(
    (reduxState: RootState) => reduxState.ThemeReducer.theme,
  );

  const appTheme = useTheme();

  const {fetched, caledarItems, loadItems, onDayChange} = useFetchUserTask(
    firebaseUser.uid,
  );

  const renderItem = (item: string, firstDayInDay: boolean) => {
    return (
      <CalendarCard
        key={item}
        taskId={item}
        uid={firebaseUser.uid}
        onPress={(task) =>
          props.navigation.navigate(ADD_TASK_SCREEN, {
            edit: true,
            existingTask: task,
          })
        }
      />
    );
  };

  const renderEmptyDate = () => {
    return (
      <TouchableOpacity
        style={styles.emptyDate}
        onPress={() =>
          props.navigation.navigate(ADD_TASK_SCREEN, {edit: false})
        }>
        <FullDivider style={{width: '90%', alignSelf: 'flex-start'}} />
      </TouchableOpacity>
    );
  };

  const rowHasChanged = (r1: any, r2: any) => {
    return r1.name !== r2.name;
  };

  return (
    <Layout level="1" style={styles.main}>
      <View style={styles.headerView}>
        <GeneralHeader
          firebaseUser={firebaseUser}
          heading="Tasks"
          rightIcon="video-outline"
          onPressLeft={() =>
            props.navigation.navigate(PROFILE_SCREEN, {
              myProfile: true,
              uid: firebaseUser.uid,
            })
          }
          onPressRight={() => props.navigation.navigate(CREATE_MEET_SCREEN)}
          onPressSearch={() => props.navigation.navigate(USER_SEARCH_SCREEN)}
        />
      </View>
      {fetched ? (
        <Layout
          style={[
            styles.main,
            {justifyContent: 'center', alignItems: 'center'},
          ]}
          level="1">
          <ActivityIndicator
            size="large"
            color={appTheme['color-primary-default']}
          />
        </Layout>
      ) : (
        <View style={styles.container}>
          <AddTaskButton
            onPress={() =>
              props.navigation.navigate(ADD_TASK_SCREEN, {edit: false})
            }
          />
          <Agenda
            displayLoadingIndicator={true}
            selected={Date.now()}
            minDate={'1990-01-01'}
            maxDate={'2050-01-01'}
            items={caledarItems}
            loadItemsForMonth={loadItems}
            renderItem={renderItem}
            renderEmptyDate={renderEmptyDate}
            rowHasChanged={rowHasChanged}
            onDayChange={onDayChange}
            theme={{
              calendarBackground:
                theme === 'dark'
                  ? appTheme['color-basic-1000']
                  : appTheme['color-basic-200'],
              agendaTodayColor: appTheme['color-primary-default'],
              selectedDayBackgroundColor: appTheme['color-primary-default'],
              backgroundColor:
                theme === 'dark'
                  ? appTheme['color-basic-800']
                  : appTheme['color-basic-100'],
              dayTextColor: theme === 'dark' ? 'white' : 'black',
              todayTextColor: 'red',
              agendaDayNumColor: 'lightgrey',
              agendaDayTextColor: 'grey',
              monthTextColor: appTheme['color-primary-default'],
              agendaKnobColor: appTheme['color-primary-default'],
            }}
          />
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  headerView: {},
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 25,
    flex: 1,
    marginTop: 20,
  },
});

export default ActivityScreen;
