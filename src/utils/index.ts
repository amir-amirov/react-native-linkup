import {Dimensions, Platform, StatusBar} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const realWidth: number = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT);

const BASE_WIDTH = 360;
const BASE_HEIGHT = 780;

export const IS_IOS = Platform.OS === 'ios';

export const scaleW = (size: number): number =>
  (SCREEN_WIDTH / BASE_WIDTH) * size;

export const scaleH = (size: number): number =>
  ((SCREEN_HEIGHT - (StatusBar.currentHeight || 0)) / BASE_HEIGHT) * size;

export const scale = (size: number): number => {
  return Math.round((size * realWidth) / realWidth);
};

//TODO: рефактор window dimensions
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT =
  Dimensions.get('window').height - (IS_IOS ? 0 : StatusBar.currentHeight || 0);
