import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const requestCameraAndAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the cameras & mic');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const checkPermission = async () => {
  if (Platform.OS === 'android') {
    const cameraPerm = await PermissionsAndroid.check(
      'android.permission.CAMERA',
    );
    const micPerm = await PermissionsAndroid.check(
      'android.permission.RECORD_AUDIO',
    );
    if (!cameraPerm || !micPerm) {
      await requestCameraAndAudioPermission();
    }
  }
};

export const checkMessagePermission = async () => {
  const enabled = await messaging().hasPermission();
  if (enabled === messaging.AuthorizationStatus.NOT_DETERMINED)
    requestUserPermission();
};

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  console.log('Notification Permission ', enabled);
};
