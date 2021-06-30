import {screenHeight, screenWidth} from '../../constants/screen/screenInfo';

//Get the height and width for remote video
export const getRemoteStreamDimensions = (
  length: number,
  headerHeight: number,
) => {
  switch (length) {
    case 1:
      return {
        height: screenHeight - headerHeight,
        width: screenWidth - 5,
      };
    case 2:
      return {
        height: (screenHeight - headerHeight) / 2,
        width: screenWidth - 5,
      };
    default:
      return {
        height: (screenHeight - headerHeight) / 2,
        width: (screenWidth - 5) / 2,
      };
  }
};
