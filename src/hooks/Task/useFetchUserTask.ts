import {useCallback, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Task} from '../../models/Task/interface';
import {timeToString} from '../../utils/Task/timeToString';
import {DateObject} from 'react-native-calendars';
import {debounce} from 'lodash';
import moment from 'moment';

const useFetchUserTask = (uid: string) => {
  const newDate = new Date();
  const [fetched, setFetched] = useState<boolean>(true);
  const [item, setItems] = useState<any>({});
  const [caledarItems, setCalendarItems] = useState<any>({});
  const [currDate, setCurrDate] = useState<DateObject>({
    dateString: moment(newDate).format('YYYY-MM-DD'),
    day: newDate.getDate(),
    month: newDate.getMonth(),
    timestamp: +newDate,
    year: newDate.getFullYear(),
  });

  const loadItems = (day: DateObject) => {
    !fetched && loadItemsFromNewChanges(day, item);
  };

  const loadItemsFromNewChanges = (day: DateObject, fetchedItems: any) => {
    setTimeout(() => {
      for (let i = -15; i < 15; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (fetchedItems[strTime]) {
          caledarItems[strTime] = fetchedItems[strTime];
        } else {
          caledarItems[strTime] = [];
        }
      }
      const newItems: any = {};
      Object.keys(caledarItems).forEach((key) => {
        newItems[key] = caledarItems[key];
      });
      setCalendarItems(newItems);
    }, 1500);
  };
  useEffect(() => {
    try {
      const subscriber = firestore()
        .collection('users')
        .doc(uid)
        .collection('task')
        .onSnapshot(
          (querySnapshot) => {
            if (querySnapshot) {
              const localItems: any = {};
              for (const doc of querySnapshot.docs) {
                if (doc.exists) {
                  const task = doc.data() as Task;
                  if (!localItems[task.date]) {
                    localItems[task.date] = [];
                  }
                  localItems[task.date].push(task.taskId);
                }
              }
              setItems(localItems);
              loadItemsFromNewChanges(currDate, localItems);
              setFetched(false);
            } else {
              setFetched(false);
            }
          },
          (error) => console.log('error'),
        );

      return () => subscriber();
    } catch (error) {
      setFetched(false);
      console.log('Error in fetching users task', error);
    }
  }, [uid]);

  const onDayChange = useCallback(
    debounce((date: DateObject | undefined) => {
      if (date) {
        setCurrDate(date);
      }
    }, 5000),
    [],
  );

  return {
    fetched,
    item,
    caledarItems,
    loadItems,
    onDayChange,
    currDate,
  };
};

export default useFetchUserTask;
