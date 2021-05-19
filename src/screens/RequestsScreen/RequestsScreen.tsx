import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import Toast from 'react-native-easy-toast';
import { Searchbar } from 'react-native-paper';
import { ScreenContainer } from 'react-native-screens';

import { Request } from '../../components/Request/Request';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { acceptRequest } from '../../redux/requests/reducer';
import {
    selectLoadingRequests,
    selectRequests,
} from '../../redux/requests/selectors';
import {
    getMoreRequestsThunk,
    getRequestsThunk,
} from '../../redux/requests/thunks';
import { addRightToUserThunk, deleteUserThunk } from '../../redux/users/thunks';
import { Right } from '../../redux/users/types';
import { DrawerRoutes } from '../../routing/routes';
import { DrawerNavigationProps } from '../../routing/types';
import styles from './RequestsScreen.styles';

const LIMIT = 10;

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
                    limit: LIMIT,
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
        <ScreenContainer style={styles.container}>
            <Searchbar
                placeholder="Поиск заявок"
                onChangeText={setQuery}
                value={query}
            />
            <Toast ref={toast} position={'center'} />
            <FlatList
                data={requests}
                refreshing={loadingRequests}
                onRefresh={loadRequests}
                onEndReachedThreshold={0.01}
                onEndReached={({ distanceFromEnd }) => {
                    if (distanceFromEnd < -1) {
                        return;
                    }
                    console.log(distanceFromEnd);
                    dispatch(
                        getMoreRequestsThunk({
                            offset: requests.length,
                            limit: LIMIT,
                            query,
                        }),
                    );
                }}
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
                keyExtractor={(item) => `${item.id}${item.email}`}
            />
        </ScreenContainer>
    );
};
