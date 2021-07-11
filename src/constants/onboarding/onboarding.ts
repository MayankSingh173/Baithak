import {
  ONBOARDING_CHAT,
  ONBOARDING_MEET,
  ONBOARDING_TASK,
} from '../Images/Images';

export const onboardingScreens: onboardConstant[] = [
  {
    key: 'meeting',
    screenName: 'meeting',
    image: ONBOARDING_MEET,
    text: 'Check in with friends or catch up with the whole family - without time limits.\n\nUse your favourite messaging app to share invite. People can join with baithak account',
    heading: 'Free ',
    headingPrimary: 'video calls',
  },
  {
    key: 'chat',
    screenName: 'chat',
    image: ONBOARDING_CHAT,
    heading: 'Chat with ',
    headingPrimary: 'friends and family',
    text: 'Get connected through chat with fast and secure messages.\n\nShare photos of your favourite memory and have fun!',
  },
  {
    key: 'task',
    screenName: 'task',
    image: ONBOARDING_TASK,
    heading: 'Plan your',
    headingPrimary: ' tasks',
    text: `Worry about your plans? Here I'm.\n\nPlan you upcoming tasks and schedule baithak with anyone and get reminders on time`,
  },
];

interface onboardConstant {
  key: string;
  screenName: string;
  image: string;
  heading: string;
  headingPrimary?: string;
  text?: string;
}
