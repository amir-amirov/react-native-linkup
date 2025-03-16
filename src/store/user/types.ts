import {CaseReducer, PayloadAction} from '@reduxjs/toolkit';

export type UserState = {
  isLoading: boolean;
  isAuth: boolean;
  user: User | null;
};

export type User = {
  email: string;
  id: number;
  name: string;
  image: string | null;
  phoneNumber: string | null;
  location: string | null;
  bio: string | null;
};

export type RegisterRequest = {
  email: string;
  name: string;
  password: string;
};

export type RegisterResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type UpdateProfileRequest = {
  id: number;
  name: string;
  image: string;
  phoneNumber: string;
  location: string;
  bio: string;
};

export type UpdateProfileResponse = {
  user: User;
};

// Contracts
export type BaseContract<T> = CaseReducer<UserState, PayloadAction<T>>;
