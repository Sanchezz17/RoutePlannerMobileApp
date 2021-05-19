import React, { useCallback, useEffect, useState } from 'react';
import { DrawerNavigationProps } from '../../routing/types';
import { DrawerRoutes } from '../../routing/routes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    selectLoadingManagers,
    selectManagers,
} from '../../redux/users/selectors';
import { FlatList } from 'react-native';
import {
    addRightToUserThunk,
    getManagersThunk,
    getMoreManagersThunk,
} from '../../redux/users/thunks';
import styles from './ManagersScreen.styles';
import { ManagerCard } from '../../components/ManagerCard/ManagerCard';
import { Searchbar } from 'react-native-paper';
import { ScreenContainer } from 'react-native-screens';
import { Right } from '../../redux/users/types';

const LIMIT = 10;

type ManagersScreenProps = DrawerNavigationProps<DrawerRoutes.Managers>;

export const ManagerScreen = ({ navigation }: ManagersScreenProps) => {
    const dispatch = useAppDispatch();
    const managers = useAppSelector(selectManagers);
    const loadingManagers = useAppSelector(selectLoadingManagers);
    const [query, setQuery] = useState('');
    const [expandedCardIndex, setExpandedCardIndex] = useState(-1);
    const loadManagers = useCallback(
        (offset: number = 0) => {
            dispatch(
                getManagersThunk({
                    offset,
                    limit: LIMIT,
                    query,
                }),
            );
        },
        [dispatch, query],
    );

    useEffect(() => {
        loadManagers();
    }, [loadManagers]);

    return (
        <ScreenContainer style={styles.container}>
            <Searchbar
                placeholder="Поиск менеджеров"
                onChangeText={setQuery}
                value={query}
            />
            <FlatList
                data={managers}
                refreshing={loadingManagers}
                onRefresh={loadManagers}
                onEndReachedThreshold={0.01}
                onEndReached={({ distanceFromEnd }) => {
                    if (distanceFromEnd < -1) {
                        return;
                    }
                    console.log(distanceFromEnd);
                    dispatch(
                        getMoreManagersThunk({
                            offset: managers.length,
                            limit: LIMIT,
                            query,
                        }),
                    );
                }}
                renderItem={({ item: user, index }) => (
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
                                action: () => {},
                            },
                            {
                                name: 'Посмотреть маршрут',
                                action: () => {},
                            },
                            ...(!user?.rights.includes(Right.Admin)
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
                                  ]
                                : []),
                            {
                                name: 'Изменить данные',
                                action: () => {
                                    navigation.navigate(DrawerRoutes.Options, {
                                        user,
                                    });
                                },
                            },
                        ]}
                    />
                )}
                keyExtractor={(item) => `${item.id}${item.email}`}
            />
        </ScreenContainer>
    );
};
