import React, { useCallback, useEffect } from 'react';
import { DrawerNavigationProps } from '../../routing/types';
import { DrawerRoutes } from '../../routing/routes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    selectLoadingManagers,
    selectManagers,
} from '../../redux/users/selectors';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { getManagersThunk } from '../../redux/users/thunks';
import styles from './ManagersScreen.styles';
import { UserCard } from '../../components/UserCard/UserCard';

type ManagersScreenProps = DrawerNavigationProps<DrawerRoutes.Requests>;

export const ManagerScreen = (_: ManagersScreenProps) => {
    const dispatch = useAppDispatch();
    const managers = useAppSelector(selectManagers);
    const loadingManagers = useAppSelector(selectLoadingManagers);

    const loadManagers = useCallback(() => {
        dispatch(getManagersThunk());
    }, [dispatch]);

    useEffect(() => {
        loadManagers();
    }, [loadManagers]);

    return (
        <SafeAreaView>
            <View>
                <FlatList
                    style={styles.managers}
                    data={managers}
                    refreshing={loadingManagers}
                    onRefresh={loadManagers}
                    renderItem={(props) => <UserCard user={props.item} />}
                    keyExtractor={(item) => item.email}
                />
            </View>
        </SafeAreaView>
    );
};
