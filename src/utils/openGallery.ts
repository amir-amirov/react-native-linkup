import {Asset, launchImageLibrary} from 'react-native-image-picker';

export const openGallery = (isImage: boolean): Promise<Asset | null> => {
  return new Promise((resolve, reject) => {
    const options: any = {
      mediaType: isImage ? 'photo' : 'video',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        resolve(null);
      } else if (response.errorMessage) {
        console.log('Error:', response.errorMessage);
        resolve(null);
      } else {
        if (response.assets && response.assets.length > 0) {
          console.log('Photo URI:', response.assets[0]);
          resolve(response.assets[0] ?? null);
        } else {
          console.log('Something went wrong..');
          resolve(null);
        }
      }
    });
  });
};
