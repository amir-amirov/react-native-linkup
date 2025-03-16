import * as Keychain from 'react-native-keychain';

// Data to store
// const data = {
//   jwt: 'your.jwt.token.here',
//   refreshToken: 'your.refresh.token.here',
//   apiKey: 'your.api.key.here',
// };

// Store the data as a JSON string
export const storeJWT = async (accessToken: string, refreshToken: string) => {
  try {
    const jsonString = JSON.stringify({accessToken, refreshToken});
    await Keychain.setGenericPassword('tokens', jsonString);
    console.log('Data stored successfully!');
  } catch (error) {
    console.log('Failed to store data:', error);
  }
};

// Retrieve and parse the data
export const getJWT = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const parsedData = JSON.parse(credentials.password);
      return parsedData;
    } else {
      console.log('No data found in the keychain.');
      return null;
    }
  } catch (error) {
    console.log('Failed to retrieve data:', error);
    return null;
  }
};

// Example usage
// storeData();
// getData().then((data) => {
//   if (data) {
//     console.log('JWT:', data.jwt);
//     console.log('Refresh Token:', data.refreshToken);
//     console.log('API Key:', data.apiKey);
//   }
// });

export const deleteJWT = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log('JWT deleted successfully!');
  } catch (error) {
    console.log('Failed to delete JWT:', error);
  }
};

//   // Example usage
//   deleteJWT();
