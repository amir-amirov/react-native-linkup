import storage from '@react-native-firebase/storage';
import {Asset} from 'react-native-image-picker';
import {getFileType} from './getFileType';

export const uploadImageToFirebase = async (filePath: any) => {
  try {
    const type = getFileType(filePath);
    const filename =
      Date.now() + filePath.uri.substring(filePath.uri.lastIndexOf('/') + 1);
    const reference = storage().ref(`linkup-${type}/${filename}`);

    await reference.putFile(filePath.uri);
    const urlOfImage = await reference.getDownloadURL();

    return urlOfImage;
  } catch (err) {
    console.error('Upload failed: ', err);
    return '';
  }
};
