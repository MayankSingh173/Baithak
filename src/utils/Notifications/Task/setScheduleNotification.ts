import {Task} from '../../../models/Task/interface';
import PushNotification from 'react-native-push-notification';

//This method will schedule a push notification for a particular channel(uid) and time
export const setScheduleNotification = async (
  task: Task,
  uid: string,
  joinOn: number,
) => {
  try {
    const reminderTime = joinOn - 15 * 60 * 1000;

    PushNotification.localNotificationSchedule({
      title: 'Reminder🔔',
      channelId: uid,
      message: task.title,
      date: new Date(reminderTime),
      repeatTime: 1,
    });
  } catch (error) {
    console.log('Error in schedule task notification', error);
  }
};
