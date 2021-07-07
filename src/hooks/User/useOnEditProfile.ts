import {useState} from 'react';
import Toast from 'react-native-toast-message';
import {
  DEFAULT_BIO,
  DEFAULT_USER_NAME,
  DEFAULT_USER_TAGLINE,
} from '../../constants/User/User';
import {userFormState, UserInterface} from '../../models/User/User';
import {writeAsync} from '../../utils/Firestore/write';

const useOnEditProfile = (firebaseUser: UserInterface, navigation: any) => {
  const initialFormState: userFormState = {
    name: firebaseUser.name ? firebaseUser.name : DEFAULT_USER_NAME,
    tagLine: firebaseUser.tagLine ? firebaseUser.tagLine : DEFAULT_USER_TAGLINE,
    bio: firebaseUser.bio ? firebaseUser.bio : DEFAULT_BIO,
    email: firebaseUser.email,
    instagram: firebaseUser.instagram,
    facebook: firebaseUser.facebook,
    github: firebaseUser.github,
    linkedIn: firebaseUser.linkedIn,
    twitter: firebaseUser.twitter,
  };

  const [isLoading, toggleModal] = useState<boolean>(false);

  const handleSubmit = async (formDetails: userFormState) => {
    try {
      toggleModal(true);
      const addOn = {
        ...(formDetails.name && {name: formDetails.name}),
        ...(formDetails.tagLine && {tagLine: formDetails.tagLine}),
        ...(formDetails.bio && {bio: formDetails.bio}),
        ...(formDetails.email && {email: formDetails.email}),
        ...(formDetails.instagram && {instagram: formDetails.instagram}),
        ...(formDetails.facebook && {facebook: formDetails.facebook}),
        ...(formDetails.github && {github: formDetails.github}),
        ...(formDetails.linkedIn && {linkedIn: formDetails.linkedIn}),
        ...(formDetails.twitter && {twitter: formDetails.twitter}),
      };

      await writeAsync('users', firebaseUser.uid, addOn, true);
      navigation.goBack();
    } catch (error) {
      toggleModal(false);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!🤔',
        text2: 'Please Try Again',
        position: 'top',
      });
    }
  };
  return {
    initialFormState,
    handleSubmit,
    isLoading,
  };
};

export default useOnEditProfile;
