import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DrawerNavigationProps } from '../../routing/types';
import { DrawerRoutes } from '../../routing/routes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FlatList, SafeAreaView, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { addRightToUserThunk, deleteUserThunk } from '../../redux/users/thunks';
import styles from './RequestsScreen.styles';
import { Request } from '../../components/Request/Request';
import { Right } from '../../redux/users/types';
import Toast from 'react-native-easy-toast';
import {
    selectLoadingRequests,
    selectRequests,
} from '../../redux/requests/selectors';
import { getRequestsThunk } from '../../redux/requests/thunks';
import { acceptRequest } from '../../redux/requests/reducer';

type RequestsScreenProps = DrawerNavigationProps<DrawerRoutes.Requests>;

export const RequestsScreen = (_: RequestsScreenProps) => {
    const dispatch = useAppDispatch();
    const requests = useAppSelector(selectRequests);
    const loadingRequests = useAppSelector(selectLoadingRequests);
    const [query, setQuery] = useState('');

    const toast = useRef<Toast>(null);

    const loadRequests = useCallback(
        (offset: number = 0) => {
            dispatch(
                getRequestsThunk({
                    offset,
                    limit: 5,
                    query,
                }),
            );
        },
        [dispatch, query],
    );

    useEffect(() => {
        loadRequests();
    }, [loadRequests]);

    return (
        <SafeAreaView>
            <Searchbar
                placeholder="Поиск заявок"
                onChangeText={setQuery}
                value={query}
            />
            <Toast ref={toast} position={'center'} />
            <View>
                <FlatList
                    style={styles.requests}
                    data={requests}
                    refreshing={loadingRequests}
                    onRefresh={loadRequests}
                    // onEndReached={}
                    // onEndReachedThreshold={0.7}
                    renderItem={(props) => (
                        <Request
                            user={props.item}
                            onAccept={() => {
                                const userId = props.item.id;
                                dispatch(
                                    addRightToUserThunk({
                                        id: userId,
                                        right: Right.Manager,
                                    }),
                                );
                                dispatch(acceptRequest(userId));
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
