import React from 'react';
import { DrawerNavigationProps } from '../../routing/types';
import { DrawerRoutes } from '../../routing/routes';
import { useAppSelector } from '../../redux/hooks';
import { selectRequests } from '../../redux/users/selectors';
import { FlatList, SafeAreaView, ScrollView } from 'react-native';
import { UserCard } from '../../components/UserCard/UserCard';

type RequestsScreenProps = DrawerNavigationProps<DrawerRoutes.Requests>;

export const RequestsScreen = (_: RequestsScreenProps) => {
    const requests = useAppSelector(selectRequests);

    // toDo стили и удаление заявок, прием заявок
    return (
        <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <FlatList
                    data={requests}
                    renderItem={(props) => <UserCard user={props.item} />}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
