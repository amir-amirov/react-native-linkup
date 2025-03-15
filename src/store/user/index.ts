import {useAppDispatch, useAppSelector as useSelector} from '../index';
import {userActions} from './slice';
import {User} from './types';

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
    removeUserDetails: () => dispatch(userActions.removeUserDetails()),
    setUser,
    setIsAuth,
  };
};
