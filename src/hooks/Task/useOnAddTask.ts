import {useState} from 'react';
import {Task, TaskFormState} from '../../models/Task/interface';
import {timeToString} from '../../utils/Task/timeToString';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {ACTIVITY_HOME_SCREEN} from '../../constants/Navigation/Navigation';
import {AndroidEvent} from '@react-native-community/datetimepicker';

const useOnAddTask = (
  uid: string,
  defaultColor: string,
  navigation: any,
  edit: boolean,
  existingTask?: Task,
) => {
  const initialFormState: TaskFormState = {
    title: existingTask?.title ? existingTask.title : '',
    description: existingTask?.description ? existingTask.description : '',
  };

  const [task, setTask] = useState<Task>({
    taskId: existingTask?.taskId ? existingTask.taskId : '',
    title: existingTask?.title ? existingTask.title : '',
    description: existingTask?.description ? existingTask.description : '',
    date: existingTask?.date ? existingTask.date : timeToString(new Date()),
    startTime: existingTask?.startTime ? existingTask.startTime : +new Date(),
    endTime: existingTask?.endTime ? existingTask.endTime : +new Date(),
    status: existingTask?.status ? existingTask.status : 'ToDo',
    createdOn: existingTask?.createdOn ? existingTask.createdOn : +new Date(),
    color:
      existingTask && existingTask.color ? existingTask.color : defaultColor,
  });

  const backgroundColors = [
    '#5CD859',
    '#24A6D9',
    defaultColor,
    'red',
    '#8022D9',
    'pink',
    '#ff00ff',
    '#F4A460',
    'gold',
  ];

  const [isLoading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<'Date' | 'StartTime' | 'EndTime'>('Date');
  const [timeValue, setTimeValue] = useState<Date>(new Date());
  const [openDatePicker, toggleDatePicker] = useState<boolean>(false);

  const handleSubmit = async (details: TaskFormState) => {
    try {
      setLoading(true);

      setTask({
        ...task,
        title: details.title,
        description: details.description,
      });

      if (edit) {
        await firestore()
          .collection('users')
          .doc(uid)
          .collection('task')
          .doc(task.taskId)
          .update({
            ...task,
            title: details.title,
            description: details.description,
          });
      } else {
        const taskRef = firestore()
          .collection('users')
          .doc(uid)
          .collection('task')
          .doc();

        await taskRef.set({
          ...task,
          taskId: taskRef.id,
          title: details.title,
          description: details.description,
        });
      }
      setLoading(false);
      navigation.goBack();
      // navigation.navigate(ACTIVITY_HOME_SCREEN);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!🤔',
        text2: 'Please try Again',
        position: 'top',
      });
      console.log('Error in creating new task', error);
    }
  };

  const onChangeStatus = (type: 'ToDo' | 'Completed' | 'OnGoing') => {
    setTask({...task, status: type});
  };

  const onChangeEvent = (
    selectedDate: Date | undefined,
    type: 'Date' | 'StartTime' | 'EndTime',
  ) => {
    const currentDate = selectedDate || new Date();
    switch (type) {
      case 'Date':
        setTask({...task, date: timeToString(currentDate)});
        break;
      case 'StartTime':
        setTask({...task, startTime: +currentDate});
        break;
      case 'EndTime':
        setTask({...task, endTime: +currentDate});
        break;
    }
    toggleDatePicker(false);
    setTimeValue(currentDate);
  };

  const onPressIcon = (type: 'Date' | 'StartTime' | 'EndTime') => {
    switch (type) {
      case 'Date':
        setMode('Date');
        break;
      case 'StartTime':
        setMode('StartTime');
        break;
      case 'EndTime':
        setMode('EndTime');
        break;
    }
    toggleDatePicker(true);
  };

  const onChangeColor = (color: string) => {
    setTask({...task, color: color});
  };

  return {
    initialFormState,
    handleSubmit,
    isLoading,
    task,
    onChangeEvent,
    onPressIcon,
    backgroundColors,
    onChangeColor,
    onChangeStatus,
    setTask,
    openDatePicker,
    mode,
    timeValue,
  };
};

export default useOnAddTask;
