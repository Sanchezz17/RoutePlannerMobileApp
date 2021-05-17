import React, { useCallback, useEffect, useState } from 'react';
import { DrawerNavigationProps } from '../../routing/types';
import { DrawerRoutes } from '../../routing/routes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    selectLoadingManagers,
    selectManagers,
} from '../../redux/users/selectors';
import { FlatList, SafeAreaView, View } from 'react-native';
import { getManagersThunk } from '../../redux/users/thunks';
import styles from './ManagersScreen.styles';
import { ManagerCard } from '../../components/ManagerCard/ManagerCard';
import { Searchbar } from 'react-native-paper';

type ManagersScreenProps = DrawerNavigationProps<DrawerRoutes.Requests>;

export const ManagerScreen = (_: ManagersScreenProps) => {
    const dispatch = useAppDispatch();
    const managers = useAppSelector(selectManagers);
    const loadingManagers = useAppSelector(selectLoadingManagers);
    const [query, setQuery] = useState('');

    const loadManagers = useCallback(() => {
        dispatch(
            getManagersThunk({
                offset: managers.length,
                limit: 5,
                query,
            }),
        );
    }, [dispatch, query]);

    useEffect(() => {
        loadManagers();
    }, [loadManagers]);

    return (
        <SafeAreaView>
            <Searchbar
                placeholder="Поиск менеджеров"
                onChangeText={setQuery}
                value={query}
            />
            <View>
                <FlatList
                    style={styles.managers}
                    data={managers}
                    refreshing={loadingManagers}
                    onRefresh={loadManagers}
                    renderItem={(props) => <ManagerCard user={props.item} />}
                    keyExtractor={(item) => item.email}
                />
            </View>
        </SafeAreaView>
    );
};
