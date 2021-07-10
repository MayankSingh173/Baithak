import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Text, useTheme, Layout, Icon} from '@ui-kitten/components';
import {Task} from '../../../models/Task/interface';
import firestore from '@react-native-firebase/firestore';

import {
  RALEWAY_BOLD,
  RALEWAY_EXTRA_BOLD,
  RALEWAY_MEDIUM,
  RALEWAY_REGULAR,
} from '../../../constants/Fonts/Fonts';
import moment from 'moment';
import {useState} from 'react';
import {useEffect} from 'react';
import {JOIN_MEET_SCREEN} from '../../../constants/Navigation/Navigation';

interface props {
  taskId: string;
  uid: string;
  onPress: (task: Task | undefined) => void;
  navigation: any;
}

const CalendarCard = (props: props) => {
  const appTheme = useTheme();
  const [fetched, setFetched] = useState<boolean>(false);
  const [task, setTask] = useState<Task>();

  useEffect(() => {
    try {
      const subscriber = firestore()
        .collection('users')
        .doc(props.uid)
        .collection('task')
        .doc(props.taskId)
        .onSnapshot((snapshot) => {
          if (snapshot && snapshot.exists) {
            setTask(snapshot.data() as Task);
            setFetched(true);
          }
        });

      return () => subscriber();
    } catch (error) {
      console.log('Error in fetching one task', error);
      setFetched(true);
    }
  }, [props.uid, props.taskId]);

  const onPressCard = () => {
    if (task?.isMeeting) {
      props.navigation.navigate(JOIN_MEET_SCREEN, {
        meetId: task.meetId,
        password: task.password,
      });
    } else {
      props.onPress(task);
    }
  };

  return !fetched ? (
    <Layout
      style={[styles.main, {justifyContent: 'center', alignItems: 'center'}]}
      level="1">
      <ActivityIndicator
        size="large"
        color={appTheme['color-primary-default']}
      />
    </Layout>
  ) : (
    <TouchableOpacity
      onPress={onPressCard}
      style={[styles.main, {backgroundColor: task?.color}]}>
      <View style={styles.firstRow}>
        {task?.isMeeting && (
          <Icon name="calendar-outline" fill="black" style={styles.icon} />
        )}
        <Text
          category="h6"
          style={[styles.title, task?.status === 'Completed' && styles.strike]}>
          {task?.title}
        </Text>
      </View>
      <Text category="s2" style={styles.timeSeries}>
        {moment(task?.startTime).format('LT')} -{' '}
        {moment(task?.endTime).format('LT')}
      </Text>
      {task?.description ? (
        <Text style={styles.description}>{task.description}</Text>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: !task?.isMeeting ? 'space-between' : 'flex-end',
          marginTop: 20,
          flex: 1,
        }}>
        {!task?.isMeeting && task?.status === 'ToDo' ? (
          <View
            style={[
              styles.statusBtn,
              {backgroundColor: appTheme['color-danger-500']},
            ]}>
            <Text category="s2" style={styles.status}>
              To-do
            </Text>
          </View>
        ) : !task?.isMeeting && task?.status === 'OnGoing' ? (
          <View
            style={[
              styles.statusBtn,
              {backgroundColor: appTheme['color-info-400']},
            ]}>
            <Text category="s2" style={styles.status}>
              On-going
            </Text>
          </View>
        ) : !task?.isMeeting && task?.status === 'Completed' ? (
          <View
            style={[
              styles.statusBtn,
              {backgroundColor: appTheme['color-success-400']},
            ]}>
            <Text category="s2" style={styles.status}>
              Completed
            </Text>
          </View>
        ) : null}
        <Text category="p2" appearance="hint" style={styles.createdOn}>
          {moment(task?.createdOn).fromNow()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 20,
    padding: 15,
    marginRight: 10,
    marginTop: 17,
    flex: 1,
    elevation: 7,
  },
  firstRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: RALEWAY_BOLD,
    color: 'black',
    flex: 4,
  },
  strike: {
    textDecorationLine: 'line-through',
  },
  timeSeries: {
    fontFamily: RALEWAY_REGULAR,
    color: 'black',
  },
  description: {
    fontFamily: RALEWAY_REGULAR,
    marginTop: 10,
    color: 'black',
  },
  statusBtn: {
    borderRadius: 20,
    padding: 8,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    fontFamily: RALEWAY_EXTRA_BOLD,
    color: 'white',
  },
  createdOn: {
    fontFamily: RALEWAY_MEDIUM,
    color: 'black',
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
});

export default CalendarCard;
