import {useAppDispatch, useAppSelector as useSelector} from '../index';
import {userActions} from './slice';
import {User} from './types';

export const useUser = () => {
  const dispatch = useAppDispatch();

  const setUser = (user: User | null) => {
    dispatch(userActions.setUser(user));
  };

  return {
    user: useSelector(({user}) => user.user),
    removeUserDetails: () => dispatch(userActions.removeUserDetails()),
    setUser,
  };
};
