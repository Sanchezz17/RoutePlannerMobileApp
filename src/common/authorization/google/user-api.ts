import {authorizeFetch} from '../../utils/autorize-fetch';
import {ApplicationPaths} from '../../api-routes';
import {User} from './user';

export interface UpdateUserDto {
  mobilePhone: string;
  telegram: string;
}

export const getCurrentUserAsync = async (): Promise<User> => {
  return await authorizeFetch(ApplicationPaths.CurrentUser);
};

export const updateUserAsync = async (
  id: number,
  updateDto: UpdateUserDto,
): Promise<User> => {
  return await authorizeFetch(`${ApplicationPaths.UpdateUser}/${id}`, {
    method: 'PUT',
    body: updateDto,
  });
};
