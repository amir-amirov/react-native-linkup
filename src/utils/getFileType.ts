import {Asset} from 'react-native-image-picker';

export const getFileType = (file: any) => {
  if (!file) return null;

  if (isLocaleFile(file)) {
    return file.type.includes('image') ? 'image' : 'video';
  }

  if (file.includes('image')) {
    return 'image';
  }
  return 'video';
};

export const isLocaleFile = (file: Asset | string) => {
  if (!file) return null;
  if (typeof file === 'object') {
    return true;
  }

  return false;
};
