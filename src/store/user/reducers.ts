import * as types from './types';
import {User} from './types';

export const removeUserDetails = (state: types.UserState) => {
  return {
    ...state,
    user: null,
  };
};
export const setUser: types.BaseContract<User | null> = (state, action) => {
  return {
    ...state,
    user: action.payload,
  };
};

export const setIsAuth: types.BaseContract<boolean> = (state, action) => {
  return {
    ...state,
    isAuth: action.payload,
  };
};
