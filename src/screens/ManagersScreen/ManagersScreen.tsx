import React, { useCallback, useEffect, useState } from 'react';
import { DrawerNavigationProps } from '../../routing/types';
import { DrawerRoutes } from '../../routing/routes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    selectLoadingManagers,
    selectManagers,
} from '../../redux/users/selectors';
import { FlatList, View } from 'react-native';
import {
    getManagersThunk,
    getMoreManagersThunk,
} from '../../redux/users/thunks';
import styles from './ManagersScreen.styles';
import { ManagerCard } from '../../components/ManagerCard/ManagerCard';
import { Searchbar } from 'react-native-paper';
import { ScreenContainer } from 'react-native-screens';

const LIMIT = 10;

type ManagersScreenProps = DrawerNavigationProps<DrawerRoutes.Managers>;

export const ManagerScreen = (_: ManagersScreenProps) => {
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
                renderItem={(props) => (
                    <ManagerCard
                        user={props.item}
                        key={props.index}
                        setExpandedCardNumber={(cardNumber: number) =>
                            setExpandedCardIndex(cardNumber)
                        }
                        cardNumber={props.index}
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
                            {
                                name: 'Назначить администратором',
                                action: () => {},
                            },
                            {
                                name: 'Изменить данные',
                                action: () => {},
                            },
                        ]}
                    />
                )}
                keyExtractor={(item) => `${item.id}${item.email}`}
            />
        </ScreenContainer>
    );
};
