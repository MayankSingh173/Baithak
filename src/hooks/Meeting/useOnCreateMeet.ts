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
    const {token, meetId, password} = await onCreateMeet(meetDetails, agoraId);
    if (token && meetDetails.name && meetId && password) {
      navigation.navigate(VIDEO_STREAM, {
        token: token,
        description: meetDetails.description,
        meetId: meetId,
        password: password,
        channelName: meetDetails.name,
        agoraId: agoraId,
        creater: 'Host',
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
    initialFormState,
    handleSubmit,
    isLoading,
  };
};

export default useOnCreateMeet;
