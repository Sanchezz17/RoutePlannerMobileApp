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
import searchUsers from '../../common/utils/searchUsers';

type ManagersScreenProps = DrawerNavigationProps<DrawerRoutes.Requests>;

export const ManagerScreen = (_: ManagersScreenProps) => {
    const dispatch = useAppDispatch();
    const managers = useAppSelector(selectManagers);
    const loadingManagers = useAppSelector(selectLoadingManagers);
    const [search, setSearch] = useState('');

    const loadManagers = useCallback(() => {
        dispatch(getManagersThunk());
    }, [dispatch]);

    useEffect(() => {
        loadManagers();
    }, [loadManagers]);

    return (
        <SafeAreaView>
            <Searchbar
                placeholder="Поиск менеджеров"
                onChangeText={setSearch}
                value={search}
            />
            <View>
                <FlatList
                    style={styles.managers}
                    data={searchUsers(search, managers)}
                    refreshing={loadingManagers}
                    onRefresh={loadManagers}
                    renderItem={(props) => <ManagerCard user={props.item} />}
                    keyExtractor={(item) => item.email}
                />
            </View>
        </SafeAreaView>
    );
};
