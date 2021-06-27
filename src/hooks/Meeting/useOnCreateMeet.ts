import {useState} from 'react';
import {generalError} from '../../components/Alerts/GeneralError';
import {TITLE} from '../../constants/Alerts/GeneralError';
import {VIDEO_STREAM} from '../../constants/Navigation/Navigation';
import {CreateMeetForm} from '../../models/Meeting/CreateMeeting/interface';
import {onCreateMeet} from '../../utils/Meeting/Methods/createMeeting';

const useOnCreateMeet = (navigation: any) => {
  const initialFormState: CreateMeetForm = {
    name: '',
    description: '',
  };

  const [isLoading, toggleModal] = useState<boolean>(false);

  const handleSubmit = async (meetDetails: CreateMeetForm) => {
    toggleModal(true);
    const token = await onCreateMeet(meetDetails);
    if (token) {
      navigation.navigate(VIDEO_STREAM, {
        token: token,
        meetDetails: meetDetails,
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
