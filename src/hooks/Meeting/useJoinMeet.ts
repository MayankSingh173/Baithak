import {useEffect, useState} from 'react';
import {generalError} from '../../components/Alerts/GeneralError';
import {TITLE} from '../../constants/Alerts/GeneralError';
import {VIDEO_STREAM} from '../../constants/Navigation/Navigation';
import {
  JoinMeetForm,
  VideoStreamParams,
} from '../../models/Meeting/CreateMeeting/interface';
import {onJoinMeet} from '../../utils/Meeting/Methods/joinMeeting';

const initialFormState: JoinMeetForm = {
  meetId: '',
  password: '',
};

const useJoinMeet = (navigation: any, agoraId: number) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isLoading, toggleModal] = useState<boolean>(false);
  const [formState, setFormState] = useState<JoinMeetForm>(initialFormState);

  const onPasswordIconPress = () => setPasswordVisible(!passwordVisible);

  //Here meetId = channelName
  const handleSubmit = async (meetDetails: JoinMeetForm) => {
    toggleModal(true);
    setFormState(meetDetails);
  };

  const joinMeet = async () => {
    const videoStreamParams = await onJoinMeet(formState, agoraId);
    if (videoStreamParams) {
      navigation.navigate(VIDEO_STREAM, videoStreamParams);
    } else {
      generalError(() => toggleModal(false), {
        title: TITLE,
        textMessage: 'Please check your id and password',
        okText: 'Ok',
      });
    }
  };

  useEffect(() => {
    if (initialFormState.meetId && initialFormState.password) {
      joinMeet;
    }
  }, [formState]);

  return {
    passwordVisible,
    onPasswordIconPress,
    handleSubmit,
    initialFormState,
    isLoading,
  };
};

export default useJoinMeet;
