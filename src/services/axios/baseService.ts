import axios from 'axios';
import {store} from '../../store/index';
import {userActions} from '../../store/user/slice';
import Config from 'react-native-config';
import {deleteJWT, storeJWT} from '../../utils/storage';

export const accessToken = 'accessToken';
export const refreshToken = 'refreshToken';

export const authAccessTokenHeaderName = 'Authorization';

// const navigate = useNavigate();

const baseService = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export const saveTokens = async (
  access_token: string,
  refresh_token: string,
) => {
  //   store.dispatch(userActions.setToken(access_token));
  await storeJWT(access_token, refresh_token);
};

export const setAuthHeader = (access_token: string) => {
  baseService.defaults.headers.common[
    authAccessTokenHeaderName
  ] = `Bearer ${access_token}`;
};

export const clearTokens = async () => {
  baseService.defaults.headers.common[authAccessTokenHeaderName] = '';
  await deleteJWT();
};

export const handleLogout = async () => {
  console.log('Logging out...');

  await clearTokens();
  store.dispatch(userActions.removeUserDetails());
  store.dispatch(userActions.setIsAuth(false));
};

baseService.interceptors.response.use(
  async response => {
    console.log('Response', response);
    console.log('Response Status:', response.status);

    if (
      response.data &&
      response.data[accessToken] &&
      response.data[refreshToken]
    ) {
      await saveTokens(response.data[accessToken], response.data[refreshToken]);
      setAuthHeader(response.data[accessToken]);
    }
    return response;
  },
  async error => {
    console.log('Error: ', error.response);
    console.log('Error 2: ', error.message);
    console.log('Error message: ', error.response.data.message);

    if (error.response?.status === 401) {
      console.log('Error logout');
      clearTokens();
      handleLogout();
    }
    return Promise.reject(error);
  },
);

baseService.interceptors.request.use(
  config => {
    console.log('Request sent:', config);
    return config;
  },
  error => Promise.reject(error),
);

export default baseService;
