import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DrawerNavigationProps } from '../../routing/types';
import { DrawerRoutes } from '../../routing/routes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    selectLoadingRequests,
    selectRequests,
} from '../../redux/users/selectors';
import { FlatList, SafeAreaView, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import {
    addRightToUserThunk,
    deleteUserThunk,
    getUsersWithoutRightsThunk,
} from '../../redux/users/thunks';
import styles from './RequestsScreen.styles';
import { Request } from '../../components/Request/Request';
import { Right } from '../../redux/users/types';
import searchUsers from '../../common/utils/searchUsers';
import Toast from 'react-native-easy-toast';

type RequestsScreenProps = DrawerNavigationProps<DrawerRoutes.Requests>;

export const RequestsScreen = (_: RequestsScreenProps) => {
    const dispatch = useAppDispatch();
    const requests = useAppSelector(selectRequests);
    const loadingRequests = useAppSelector(selectLoadingRequests);
    const [search, setSearch] = useState('');

    const toast = useRef<Toast>(null);

    const loadRequests = useCallback(() => {
        dispatch(getUsersWithoutRightsThunk());
    }, [dispatch]);

    useEffect(() => {
        loadRequests();
    }, [loadRequests]);

    return (
        <SafeAreaView>
            <Searchbar
                placeholder="Поиск заявок"
                onChangeText={setSearch}
                value={search}
            />
            <Toast ref={toast} position={'center'} />
            <View>
                <FlatList
                    style={styles.requests}
                    data={searchUsers(search, requests)}
                    refreshing={loadingRequests}
                    onRefresh={loadRequests}
                    renderItem={(props) => (
                        <Request
                            user={props.item}
                            onAccept={() => {
                                dispatch(
                                    addRightToUserThunk({
                                        id: props.item.id,
                                        right: Right.Manager,
                                    }),
                                );
                                toast.current?.show('Заявка принята', 1500);
                            }}
                            onReject={() => {
                                dispatch(deleteUserThunk(props.item.id));
                                toast.current?.show('Заявка отклонена', 1500);
                            }}
                        />
                    )}
                    keyExtractor={(item) => item.email}
                />
            </View>
        </SafeAreaView>
    );
};
