import {useAppDispatch, useAppSelector as useSelector} from '../index';
import {userActions} from './slice';
import {loginUser} from './thunks/loginUser';
import {registerUser} from './thunks/registerUser';
import {LoginRequest, RegisterRequest, User} from './types';

export const useUser = () => {
  const dispatch = useAppDispatch();

  const setUser = (user: User | null) => {
    dispatch(userActions.setUser(user));
  };

  const setIsAuth = (isAuth: boolean) => {
    dispatch(userActions.setIsAuth(isAuth));
  };

  return {
    user: useSelector(({user}) => user.user),
    isAuth: useSelector(({user}) => user.isAuth),
    isLoading: useSelector(({user}) => user.isLoading),
    removeUserDetails: () => dispatch(userActions.removeUserDetails()),
    setUser,
    setIsAuth,
    registerUser: async (registerData: RegisterRequest) =>
      dispatch(registerUser(registerData)).unwrap(),
    loginUser: async (loginData: LoginRequest) =>
      dispatch(loginUser(loginData)).unwrap(),
  };
};
