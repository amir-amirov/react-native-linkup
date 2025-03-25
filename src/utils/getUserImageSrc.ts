import FastImage from 'react-native-fast-image';
export const getUserImageSrc = (imagePath: string | null) => {
  if (imagePath) {
    return {uri: imagePath, cache: FastImage.cacheControl.immutable};
  } else {
    return {
      uri: 'gs://auth-2c46a.appspot.com/cappuccino_pic_3_portrait.png',
      cache: FastImage.cacheControl.immutable,
    };
  }
};
