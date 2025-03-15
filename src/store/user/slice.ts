import * as types from './types';
import {createSlice} from '@reduxjs/toolkit';

import * as reducers from './reducers';
import {extraReducers} from './thunks';

const initialState: types.UserState = {
  isLoading: false,
  isAuth: false,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
  extraReducers,
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
