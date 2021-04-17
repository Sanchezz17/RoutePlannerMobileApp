import {authorizeFetch} from '../utils/autorize-fetch';
import {ApplicationPaths} from '../api-routes';
import {Coordinate, User} from './user';

export interface UpdateUserDto {
  mobilePhone: string;
  telegram: string;
  coordinate: Coordinate;
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
    body: JSON.stringify(updateDto),
  });
};
