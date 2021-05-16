import { User } from '../../redux/users/types';

const searchUsers = (search: string, users: User[]) => {
    const lowerSearch = search.toLowerCase();
    return search
        ? users.filter((user) => {
              return (
                  user.name.toLowerCase().startsWith(lowerSearch) ||
                  user.email?.toLowerCase().startsWith(lowerSearch) ||
                  user.telegram?.toLowerCase().startsWith(lowerSearch) ||
                  user.mobilePhone?.toLowerCase().startsWith(lowerSearch)
              );
          })
        : users;
};

export default searchUsers;
