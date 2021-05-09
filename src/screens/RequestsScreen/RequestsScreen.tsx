import React, { useEffect } from 'react';
import { DrawerNavigationProps } from '../../routing/types';
import { DrawerRoutes } from '../../routing/routes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectRequests } from '../../redux/users/selectors';
import { FlatList, SafeAreaView, ScrollView } from 'react-native';
import { UserCard } from '../../components/UserCard/UserCard';
import { getUsersWithoutRightsThunk } from '../../redux/users/thunks';

type RequestsScreenProps = DrawerNavigationProps<DrawerRoutes.Requests>;

export const RequestsScreen = (_: RequestsScreenProps) => {
    const dispatch = useAppDispatch();
    const requests = useAppSelector(selectRequests);

    useEffect(() => {
        dispatch(getUsersWithoutRightsThunk());
    }, [dispatch]);

    // toDo стили и удаление заявок, прием заявок
    return (
        <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <FlatList
                    data={requests}
                    renderItem={(props) => <UserCard user={props.item} />}
                    keyExtractor={(item) => item.email}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
