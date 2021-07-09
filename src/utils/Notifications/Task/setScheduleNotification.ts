import {Task} from '../../../models/Task/interface';
import {UserInterface} from '../../../models/User/User';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';

export const setScheduleNotification = async (
  task: Task,
  firebaseUser: UserInterface,
) => {
  try {
    const reminderTime =
      +new Date(task.date + ' ' + moment(task.startTime).format('LTS')) -
      15 * 60 * 1000;

    PushNotification.localNotificationSchedule({
      title: 'Reminder🔔',
      channelId: firebaseUser.uid,
      message: task.title,
      date: new Date(reminderTime),
      repeatTime: 1,
    });
  } catch (error) {
    console.log('Error in schedule task notification', error);
  }
};
