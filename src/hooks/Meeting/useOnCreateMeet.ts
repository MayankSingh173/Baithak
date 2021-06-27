import {useState} from 'react';
import {generalError} from '../../components/Alerts/GeneralError';
import {TITLE} from '../../constants/Alerts/GeneralError';
import {VIDEO_STREAM} from '../../constants/Navigation/Navigation';
import {CreateMeetForm} from '../../models/Meeting/CreateMeeting/interface';
import {onCreateMeet} from '../../utils/Meeting/Methods/createMeeting';

const useOnCreateMeet = (navigation: any, agoraId: number) => {
  const initialFormState: CreateMeetForm = {
    name: '',
    description: '',
  };

  const [isLoading, toggleModal] = useState<boolean>(false);

  const handleSubmit = async (meetDetails: CreateMeetForm) => {
    toggleModal(true);
    const {token, channelName} = await onCreateMeet(meetDetails, agoraId);
    if (token && channelName) {
      navigation.navigate(VIDEO_STREAM, {
        token: token,
        name: meetDetails.name,
        description: meetDetails.description,
        meetId: channelName.split('=')[1],
        password: channelName.split('=')[2],
        channelName: channelName,
        agoraId: agoraId,
      });
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
