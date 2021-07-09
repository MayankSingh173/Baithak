import {Task} from '../../../models/Task/interface';
import {UserInterface} from '../../../models/User/User';
import PushNotification from 'react-native-push-notification';

export const setScheduleNotification = async (
  task: Task,
  firebaseUser: UserInterface,
) => {
  try {
    PushNotification.localNotificationSchedule({
      title: 'Reminder🔔',
      channelId: firebaseUser.uid,
      message: task.title, // (required)
      date: new Date(task.startTime - 15 * 60 * 1000),
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeateType. Check 'Repeating Notifications' section for more info.
    });
  } catch (error) {
    console.log('Error in schedule task notification', error);
  }
};
