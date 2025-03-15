import axios from 'axios';
import {store} from '../../store/index';
import {userActions} from '../../store/user/slice';
import Config from 'react-native-config';

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

export const saveTokens = (access_token: string, refresh_token: string) => {
  //   store.dispatch(userActions.setToken(access_token));
};

export const setAuthHeader = (access_token: string) => {
  baseService.defaults.headers.common[
    authAccessTokenHeaderName
  ] = `Bearer ${access_token}`;
};

export const clearTokens = () => {
  baseService.defaults.headers.common[authAccessTokenHeaderName] = '';
  //   store.dispatch(authActions.removeToken());
};

export const handleLogout = () => {
  console.log('Logging out...');

  store.dispatch(userActions.removeUserDetails());
  store.dispatch(userActions.setIsAuth(false));

  // Clear the Authorization header
  delete baseService.defaults.headers.common['Authorization'];

  // Optionally, redirect the user (if using React Router)
  //   const navigate = useNavigate();
};

baseService.interceptors.response.use(
  response => {
    console.log('Response', response);
    console.log('Response Status:', response.status);
    console.log('Response Message:', response.data.message);

    // if (response.data.data && response.data.data[accessToken]) {
    //   saveTokens(response.data.data[accessToken]);
    //   setAuthHeader(response.data.data[accessToken]);
    // }
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
