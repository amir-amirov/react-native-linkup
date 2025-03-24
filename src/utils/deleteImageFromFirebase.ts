import storage from '@react-native-firebase/storage';

export const deleteFileFromFirebaseStorage = async (fileUrl: string) => {
  try {
    if (!fileUrl) {
      console.warn('deleteFileFromFirebaseStorage: No file URL provided.');
      return false;
    }

    // Extract the file path from the URL
    const storageRef = storage().refFromURL(fileUrl);

    await storageRef.delete();
    console.log(`Successfully deleted file: ${fileUrl}`);
    return true;
  } catch (error: any) {
    console.error(`Error deleting file ${fileUrl}:`, error);
    // Handle specific error codes if needed
    if (error.code === 'storage/object-not-found') {
      console.warn(`File not found in Firebase Storage: ${fileUrl}`);
      return true; // Consider it successful if the file doesn't exist
    }
    return false;
  }
};
