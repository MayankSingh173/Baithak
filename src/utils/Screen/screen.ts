import {screenHeight, screenWidth} from '../../constants/screen/screenInfo';

//Get the height and width for remote video
export const getRemoteStreamDimensions = (length: number) => {
  switch (length) {
    case 1:
      return {
        height: screenHeight,
        width: screenWidth,
      };
    case 2:
      return {
        height: screenHeight / 2,
        width: screenWidth,
      };
    default:
      return {
        height: screenHeight / 2,
        width: screenWidth / 2,
      };
  }
};
