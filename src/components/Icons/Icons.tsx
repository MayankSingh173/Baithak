import React from 'react';
import {Icon} from '@ui-kitten/components';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import {INSTA_LOGO} from '../../constants/Images/Images';

export const EmailIcon = (style: any) => (
  <Icon {...style} name="email-outline" />
);

export const ProfileIconFill = (style: any) => (
  <Icon {...style} name="person" />
);

export const ProfileIcon = (style: any) => (
  <Icon {...style} name="person-outline" />
);

export const PhoneIcon = (style: any) => (
  <Icon {...style} name="phone-outline" />
);

export const TagIcon = (style: any) => <Icon {...style} name="hash-outline" />;

export const SearchIcon = (style: any) => (
  <Icon {...style} name="search-outline" />
);

export const PlusIcon = (style: any) => <Icon {...style} name="plus" />;

export const PasswordIcon = (style: any) => (
  <Icon {...style} name="lock-outline" />
);

export const ArrowIosBackIcon = (style: any) => (
  <Icon {...style} name="arrow-ios-back" />
);

export const closeIcon = (style: any) => (
  <Icon {...style} name="close-outline" />
);

export const DurationIcon = (style: any) => <Icon {...style} name="plus" />;

export const LocationIcon = (style: any) => <Icon {...style} name="plus" />;

export const MeetIcon = (style: any) => (
  <Icon {...style} name="video-outline" />
);

export const BellIcon = (props: any) => <Icon {...props} name="bell-outline" />;

export const BellIconFill = (props: any) => <Icon {...props} name="bell" />;

export const MeetIconFill = (style: any) => <Icon {...style} name="video" />;

export const ChatIcon = (style: any) => (
  <Icon {...style} name="message-circle-outline" />
);

export const ChatIconFill = (style: any) => (
  <Icon {...style} name="message-circle" />
);

export const AddIcon = (style: any) => (
  <Icon {...style} name="plus-circle-outline" fill="black" />
);

export const NameIcon = (style: any) => (
  <Icon {...style} name="edit-2-outline" />
);

export const DescriptionIcon = (style: any) => (
  <Icon {...style} name="menu-outline" />
);

export const FacebookIcon = (style: any) => (
  <Icon {...style} name="facebook" fill="#4267B2" />
);

export const GithubIcon = (style: any, color?: string) => (
  <Icon {...style} name="github" fill={color ? color : '#fafafa'} />
);

export const LinkedInIcon = (style: any) => (
  <Icon {...style} name="linkedin" fill="#0077b5" />
);

export const TwitterIcon = (style: any) => (
  <Icon {...style} name="twitter" fill="#00acee" />
);

export const InstaIcon = (props: any) => {
  return <FastImage source={{uri: INSTA_LOGO}} style={props.style} />;
};
