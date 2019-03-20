import { Dimensions, Platform, StatusBar } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  noStatusBarHeight: ( Platform.OS === 'ios' ?
    (height)
    :
    (height - StatusBar.currentHeight)
  ),
  isSmallDevice: width < 375,
};
