import React from 'react';

import { ManagerCard } from '../../components/Cards/ManagerCard/ManagerCard';
import { ListScreen } from '../../containers/ListScreen/ListScreen';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    selectCurrentUser,
    selectLoadingManagers,
    selectManagers,
} from '../../redux/users/selectors';
import {
    addRightToUserThunk,
    getManagersThunk,
    getMoreManagersThunk,
} from '../../redux/users/thunks';
import { hasUserRight, Right, User } from '../../redux/users/types';
import { DrawerRoutes } from '../../routing/main/routes';
import { ManagersRoutes } from '../../routing/managers/routes';
import { ManagersStackNavigationProps } from '../../routing/managers/types';

type ManagersScreenProps = ManagersStackNavigationProps<ManagersRoutes.Managers>;

export const ManagersScreen = ({ navigation }: ManagersScreenProps) => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);
    return (
        <ListScreen
            renderCard={(
                user: User,
                index,
                expandedCardIndex,
                setExpandedCardIndex,
            ) => (
                <ManagerCard
                    user={user}
                    key={index}
                    setExpandedCardNumber={(cardNumber: number) =>
                        setExpandedCardIndex(cardNumber)
                    }
                    cardNumber={index}
                    expandedCardNumber={expandedCardIndex}
                    menuItems={[
                        {
                            name: 'Посмотреть график',
                            action: () => {
                                navigation.navigate(ManagersRoutes.Schedule, {
                                    user,
                                });
                            },
                        },
                        {
                            name: 'Посмотреть маршрут',
                            action: () => {
                                navigation.navigate(ManagersRoutes.Route, {
                                    user,
                                });
                            },
                        },
                        ...(!hasUserRight(user, Right.Admin)
                            ? [
                                  {
                                      name: 'Назначить администратором',
                                      action: () => {
                                          dispatch(
                                              addRightToUserThunk({
                                                  id: user.id,
                                                  right: Right.Admin,
                                              }),
                                          );
                                      },
                                  },
                                  {
                                      name: 'Изменить данные',
                                      action: () => {
                                          if (currentUser.id === user.id) {
                                              navigation.navigate(
                                                  ManagersRoutes.CurrentUserOptions,
                                                  {
                                                      screen:
                                                          DrawerRoutes.Options,
                                                      params: { user },
                                                  },
                                              );
                                          } else {
                                              navigation.navigate(
                                                  ManagersRoutes.Options,
                                                  {
                                                      user,
                                                  },
                                              );
                                          }
                                      },
                                  },
                              ]
                            : []),
                    ]}
                />
            )}
            cardKeyExtractor={(item: User) => `${item.id}${item.email}`}
            dataSelector={selectManagers}
            loadingSelector={selectLoadingManagers}
            loadDataThunk={getManagersThunk}
            loadMoreDataThunk={getMoreManagersThunk}
            navigation={navigation.dangerouslyGetParent()}
            screenTitle={'Менеджеры'}
        />
    );
};
