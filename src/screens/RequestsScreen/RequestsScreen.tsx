import React, { useCallback, useEffect, useState } from 'react';
import { DrawerNavigationProps } from '../../routing/types';
import { DrawerRoutes } from '../../routing/routes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    selectLoadingRequests,
    selectRequests,
} from '../../redux/users/selectors';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import {
    addRightToUserThunk,
    deleteUserThunk,
    getUsersWithoutRightsThunk,
} from '../../redux/users/thunks';
import styles from './RequestsScreen.styles';
import { Request } from '../../components/Request/Request';
import { Right } from '../../redux/users/types';

type RequestsScreenProps = DrawerNavigationProps<DrawerRoutes.Requests>;

export const RequestsScreen = (_: RequestsScreenProps) => {
    const dispatch = useAppDispatch();
    const requests = useAppSelector(selectRequests);
    const loadingRequests = useAppSelector(selectLoadingRequests);

    const loadRequests = useCallback(() => {
        dispatch(getUsersWithoutRightsThunk());
    }, [dispatch]);

    useEffect(() => {
        loadRequests();
    }, [loadRequests]);

    return (
        <SafeAreaView>
            <View>
                <FlatList
                    style={styles.requests}
                    data={requests}
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
                            }}
                            onReject={() => {
                                dispatch(deleteUserThunk(props.item.id));
                            }}
                        />
                    )}
                    keyExtractor={(item) => item.email}
                />
            </View>
        </SafeAreaView>
    );
};
