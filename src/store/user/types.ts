import {CaseReducer, PayloadAction} from '@reduxjs/toolkit';

export type UserState = {
  isLoading: boolean;
  user: User | null;
};

export type User = {
  email: string;
  id: number;
  name: string;
  image: string | null;
};
// Contracts
export type BaseContract<T> = CaseReducer<UserState, PayloadAction<T>>;
