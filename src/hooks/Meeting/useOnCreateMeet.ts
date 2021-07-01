import {useState} from 'react';
import {generalError} from '../../components/Alerts/GeneralError';
import {TITLE} from '../../constants/Alerts/GeneralError';
import {VIDEO_STREAM} from '../../constants/Navigation/Navigation';
import {
  CreateMeetForm,
  VideoStreamParams,
} from '../../models/Meeting/CreateMeeting/interface';
import {onCreateMeet} from '../../utils/Meeting/Methods/createMeeting';

const useOnCreateMeet = (navigation: any, agoraId: number) => {
  const initialFormState: CreateMeetForm = {
    name: '',
    description: '',
  };

  const [isLoading, toggleModal] = useState<boolean>(false);

  const handleSubmit = async (meetDetails: CreateMeetForm) => {
    toggleModal(true);
    const meet = await onCreateMeet(meetDetails, agoraId);
    if (meet?.token && meetDetails.name && meet?.meetId && meet?.password) {
      navigation.navigate(VIDEO_STREAM, {
        token: meet.token,
        description: meetDetails.description,
        meetId: meet.meetId,
        password: meet.password,
        channelName: meetDetails.name,
        agoraId: agoraId,
        creater: 'Host',
      } as VideoStreamParams);
      toggleModal(false);
    } else {
      generalError(() => toggleModal(false), {
        title: TITLE,
        textMessage: 'Please Try Again',
        okText: 'Ok',
      });
    }
  };

  return {
    initialFormState,
    handleSubmit,
    isLoading,
  };
};

export default useOnCreateMeet;
