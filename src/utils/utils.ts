import {mediaDevices} from 'react-native-webrtc';

export default class Util {
  static async getStream() {
    let isFront = true;
    const sourceInfos = await mediaDevices.enumerateDevices();
    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if (
        sourceInfo.kind == 'videoinput' &&
        sourceInfo.facing == (isFront ? 'front' : 'environment')
      ) {
        videoSourceId = sourceInfo.deviceId;
      }
    }

    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        mandatory: {
          minHeight: 480,
          minWidth: 640,
          minFrameRate: 30,
        },
        facingMode: isFront ? 'user' : 'environment',
        optional: [{sourceId: videoSourceId}],
      },
    });

    if (typeof stream != 'boolean') return stream;
    else return null;
  }
}
