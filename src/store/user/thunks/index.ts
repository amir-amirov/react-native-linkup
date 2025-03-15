import {ActionReducerMapBuilder, isAnyOf} from '@reduxjs/toolkit';
import {UserState} from '../types';
import {registerUser} from './registerUser';
import {loginUser} from './loginUser';

export const extraReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addMatcher(
    isAnyOf(registerUser.pending, loginUser.pending),
    state => {
      state.isLoading = true;
    },
  );

  builder.addMatcher(isAnyOf(registerUser.fulfilled), (state, action) => {
    state.isLoading = false;
    state.user = action.payload;
  });

  builder.addMatcher(isAnyOf(loginUser.fulfilled), (state, action) => {
    state.isLoading = false;
    state.user = action.payload;
  });

  builder.addMatcher(
    isAnyOf(registerUser.rejected, loginUser.rejected),
    state => {
      state.isLoading = false;
    },
  );
};
