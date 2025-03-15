import {createAsyncThunk} from '@reduxjs/toolkit';
import {RegisterRequest, RegisterResponse, User} from '../types';
import baseService from '../../../services/axios/baseService';

export const registerUser = createAsyncThunk<
  User,
  RegisterRequest,
  {rejectValue: string}
>('auth/registerUser', async (registerData, {rejectWithValue}) => {
  try {
    const response = await baseService.post<RegisterResponse>(
      '/users/signup',
      registerData,
    );
    const {user} = response.data;

    return user;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue('An unknown error occurred.');
  }
});
