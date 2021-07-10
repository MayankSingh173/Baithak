import {useEffect, useState} from 'react';
import {generalError} from '../../components/Alerts/GeneralError';
import {TITLE} from '../../constants/Alerts/GeneralError';
import {VIDEO_STREAM} from '../../constants/Navigation/Navigation';
import {JoinMeetForm} from '../../models/Meeting/CreateMeeting/interface';
import {onJoinMeet} from '../../utils/Meeting/Methods/joinMeeting';

const useJoinMeet = (
  navigation: any,
  agoraId: number,
  existingMeetId?: string,
  existingPassword?: string,
) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isLoading, toggleModal] = useState<boolean>(false);

  const onPasswordIconPress = () => setPasswordVisible(!passwordVisible);

  const initialFormState: JoinMeetForm = {
    meetId: existingMeetId ? existingMeetId : '',
    password: existingPassword ? existingPassword : '',
  };

  //Here meetId = channelName
  const handleSubmit = async (meetDetails: JoinMeetForm) => {
    toggleModal(true);
    await joinMeet(meetDetails);
  };

  const joinMeet = async (meetDetails: JoinMeetForm) => {
    const videoStreamParams = await onJoinMeet(meetDetails, agoraId);
    if (videoStreamParams) {
      navigation.navigate(VIDEO_STREAM, videoStreamParams);
      toggleModal(false);
    } else {
      generalError(() => toggleModal(false), {
        title: TITLE,
        textMessage: 'Please check your id and password',
        okText: 'Ok',
      });
    }
  };

  return {
    passwordVisible,
    onPasswordIconPress,
    handleSubmit,
    initialFormState,
    isLoading,
  };
};

export default useJoinMeet;
