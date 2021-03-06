import {authorizeFetch} from '../../utils/autorize-fetch';
import {ApplicationPaths} from '../../routes';
import {User} from './user';

export const getCurrentUserAsync = async (): Promise<User> => {
  return await authorizeFetch(ApplicationPaths.CurrentUser);
};
