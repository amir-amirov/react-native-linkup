import {createAsyncThunk} from '@reduxjs/toolkit';
import {UpdateProfileRequest, UpdateProfileResponse, User} from '../types';
import baseService from '../../../services/axios/baseService';

export const updateProfile = createAsyncThunk<
  User,
  Partial<UpdateProfileRequest>,
  {rejectValue: string}
>('auth/updateUser', async (updateData, {rejectWithValue}) => {
  try {
    const response = await baseService.put<UpdateProfileResponse>(
      '/users/update-profile',
      updateData,
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
