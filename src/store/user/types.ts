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

// Contracts
export type BaseContract<T> = CaseReducer<UserState, PayloadAction<T>>;
