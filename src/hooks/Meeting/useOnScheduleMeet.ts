import {useState} from 'react';
import {Task} from '../../models/Task/interface';
import {timeToString} from '../../utils/Task/timeToString';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {setScheduleNotification} from '../../utils/Notifications/Task/setScheduleNotification';
import {UserInterface} from '../../models/User/User';
import {CreateMeetForm} from '../../models/Meeting/CreateMeeting/interface';
import {
  SCHEDULE_MEET_SCREEN,
  USER_ADD_SEARCH_SCREEN,
} from '../../constants/Navigation/Navigation';
import {createBaithakForSchedule} from '../../utils/Meeting/Methods/createBaithakForSchedule';
import moment from 'moment';

const useOnScheduleMeet = (
  firebaseUser: UserInterface,
  defaultColor: string,
  navigation: any,
) => {
  const initialFormState: CreateMeetForm = {
    name: '',
    description: '',
  };

  const [task, setTask] = useState<Task>({
    taskId: '',
    title: '',
    description: '',
    date: +new Date(),
    startTime: +new Date(),
    endTime: +new Date() + 60 * 60 * 1000,
    status: 'ToDo',
    createdOn: +new Date(),
    color: defaultColor,
    members: [],
    isMeeting: true,
  });

  const [isLoading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<'Date' | 'StartTime' | 'EndTime'>('Date');
  const [timeValue, setTimeValue] = useState<Date>(new Date());
  const [openDatePicker, toggleDatePicker] = useState<boolean>(false);
  const [selectedMembers, setSelectedMembers] = useState<UserInterface[]>([
    firebaseUser,
  ]);

  const handleSubmit = async (details: CreateMeetForm) => {
    try {
      setLoading(true);

      setTask({
        ...task,
        title: details.name,
        description: details.description,
      });

      //Time at which the user has schedule the meet
      const joinOn = +new Date(
        new Date(task.date).getFullYear(),
        new Date(task.date).getMonth(),
        new Date(task.date).getDate(),
        new Date(task.startTime).getHours(),
        new Date(task.startTime).getMinutes(),
        new Date(task.startTime).getSeconds(),
      );

      await createBaithakForSchedule(
        selectedMembers,
        details.name,
        firebaseUser,
        {
          ...task,
          title: details.name,
          description: details.description,
        },
        joinOn,
        details.description,
      );

      setLoading(false);
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: 'Baithak Schedule',
        text2: `New Baithak has been schedule on ${moment(joinOn).format(
          'MMMM Do YYYY, h:mm a',
        )}`,
        position: 'top',
      });
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

  const onChangeEvent = (
    selectedDate: Date | undefined,
    type: 'Date' | 'StartTime' | 'EndTime',
  ) => {
    const currentDate = selectedDate || new Date();
    switch (type) {
      case 'Date':
        setTask({...task, date: +currentDate});
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

  const onCancel = () => {
    toggleDatePicker(false);
  };

  const onAddParticipants = (members: UserInterface[] | undefined) => {
    if (members) {
      let uniqueMembersList = selectedMembers.concat(members);

      //This will remove duplicates
      uniqueMembersList = [
        ...new Map(uniqueMembersList.map((item) => [item.uid, item])).values(),
      ];

      setSelectedMembers(uniqueMembersList);
      setTask({...task, members: uniqueMembersList});
    }
  };

  const onPressAdd = () => {
    navigation.navigate(USER_ADD_SEARCH_SCREEN, {
      getSelectedMembers: onAddParticipants,
      toScreen: SCHEDULE_MEET_SCREEN,
    });
  };

  const onRemoveMember = (uid: string) => {
    const modifyMembers = selectedMembers.filter((m) => m.uid !== uid);
    setSelectedMembers(modifyMembers);
    setTask({...task, members: modifyMembers});
  };

  return {
    initialFormState,
    handleSubmit,
    isLoading,
    task,
    onChangeEvent,
    onPressIcon,
    setTask,
    openDatePicker,
    mode,
    timeValue,
    onCancel,
    selectedMembers,
    onPressAdd,
    onRemoveMember,
  };
};

export default useOnScheduleMeet;
