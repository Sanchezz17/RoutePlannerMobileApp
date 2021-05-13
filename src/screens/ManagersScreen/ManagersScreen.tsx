import React, { useEffect, useState } from 'react';
import { DrawerNavigationProps } from '../../routing/types';
import { DrawerRoutes } from '../../routing/routes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectManagers } from '../../redux/users/selectors';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { getManagersThunk } from '../../redux/users/thunks';
import styles from './ManagersScreen.styles';
import { UserCard } from '../../components/UserCard/UserCard';

type ManagersScreenProps = DrawerNavigationProps<DrawerRoutes.Requests>;

export const ManagerScreen = (_: ManagersScreenProps) => {
    const dispatch = useAppDispatch();
    const managers = useAppSelector(selectManagers);

    const [loadingManagers, setLoadingManagers] = useState(false);

    useEffect(() => {
        setLoadingManagers(true);
        dispatch(getManagersThunk());
    }, [dispatch]);

    useEffect(() => {
        if (managers !== undefined) {
            setLoadingManagers(false);
        }
    }, [managers]);

    return (
        <SafeAreaView>
            <View>
                {loadingManagers ? (
                    <Text style={styles.loadingText}>
                        {'Получение информации о менеджерах...'}
                    </Text>
                ) : (
                    <FlatList
                        data={managers}
                        renderItem={(props) => <UserCard user={props.item} />}
                        keyExtractor={(item) => item.email}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};
