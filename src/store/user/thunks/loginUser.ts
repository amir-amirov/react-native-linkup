import {createAsyncThunk} from '@reduxjs/toolkit';
import {LoginRequest, LoginResponse, User} from '../types';
import baseService from '../../../services/axios/baseService';

export const loginUser = createAsyncThunk<
  User,
  LoginRequest,
  {rejectValue: string}
>('auth/login', async (loginData, {rejectWithValue}) => {
  try {
    const response = await baseService.post<LoginResponse>(
      '/users/signin',
      loginData,
    );
    const {user} = response.data;

    return user;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue('Invalid credentials.');
  }
});
