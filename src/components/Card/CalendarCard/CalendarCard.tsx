import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Text, Button, useTheme, Layout} from '@ui-kitten/components';
import {Task} from '../../../models/Task/interface';
import firestore from '@react-native-firebase/firestore';

import {
  RALEWAY_BOLD,
  RALEWAY_EXTRA_BOLD,
  RALEWAY_REGULAR,
} from '../../../constants/Fonts/Fonts';
import moment from 'moment';
import {useState} from 'react';
import {useEffect} from 'react';

interface props {
  taskId: string;
  uid: string;
  onPress: (task: Task | undefined) => void;
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
  });

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
      onPress={() => props.onPress(task)}
      style={[styles.main, {backgroundColor: task?.color}]}>
      <Text
        category="h6"
        style={[styles.title, task?.status === 'Completed' && styles.strike]}>
        {task?.title}
      </Text>
      <Text category="s2" style={styles.timeSeries}>
        {moment(task?.startTime).format('LT')} -{' '}
        {moment(task?.endTime).format('LT')}
      </Text>
      {/* {props.task.description && (
        <Text style={styles.description}>{props.task.description}</Text>
      )} */}
      <View>
        {task?.status === 'ToDo' ? (
          <View
            style={[
              styles.statusBtn,
              {backgroundColor: appTheme['color-danger-500']},
            ]}>
            <Text category="s2" style={styles.status}>
              To-do
            </Text>
          </View>
        ) : task?.status === 'OnGoing' ? (
          <View
            style={[
              styles.statusBtn,
              {backgroundColor: appTheme['color-info-500']},
            ]}>
            <Text category="s2" style={styles.status}>
              On-going
            </Text>
          </View>
        ) : task?.status === 'Completed' ? (
          <View
            style={[
              styles.statusBtn,
              {backgroundColor: appTheme['color-success-500']},
            ]}>
            <Text category="s2" style={styles.status}>
              Completed
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 10,
    padding: 20,
    marginRight: 10,
    marginTop: 17,
    flex: 1,
  },
  title: {
    fontFamily: RALEWAY_BOLD,
    color: 'black',
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
    marginTop: 20,
    padding: 8,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    fontFamily: RALEWAY_EXTRA_BOLD,
  },
});

export default CalendarCard;
