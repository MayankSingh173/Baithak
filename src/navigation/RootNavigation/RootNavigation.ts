import {NavigationContainerRef} from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef>();

export const navigate = (name: string, params: any) => {
  // Perform navigation if the app has mounted
  if (navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current?.navigate(name, params);
  }
};
