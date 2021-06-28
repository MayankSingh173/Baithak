import {useState} from 'react';
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

  const onPasswordIconPress = () => setPasswordVisible(!passwordVisible);

  //Here meetId = channelName
  const handleSubmit = async (meetDetails: JoinMeetForm) => {
    toggleModal(true);

    const {token} = await onJoinMeet(meetDetails, agoraId);
    if (token && meetDetails.meetId) {
      navigation.navigate(VIDEO_STREAM, {
        token: token,
        description: '',
        meetId: meetDetails.meetId,
        password: meetDetails.password,
        channelName: meetDetails.meetId,
        agoraId: agoraId,
        creater: 'Member',
      } as VideoStreamParams);
    } else {
      generalError(() => toggleModal(false), {
        title: TITLE,
        textMessage: 'Please Try Again',
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
