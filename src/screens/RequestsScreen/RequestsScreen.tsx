import React, { useEffect, useState } from 'react';
import { DrawerNavigationProps } from '../../routing/types';
import { DrawerRoutes } from '../../routing/routes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectRequests } from '../../redux/users/selectors';
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

    const [loadingRequests, setLoadingRequests] = useState(false);

    useEffect(() => {
        setLoadingRequests(true);
        dispatch(getUsersWithoutRightsThunk());
    }, [dispatch]);

    useEffect(() => {
        if (requests.length > 0) {
            setLoadingRequests(false);
        }
    }, [requests]);

    // toDo стили и удаление заявок, прием заявок
    return (
        <SafeAreaView>
            <View>
                {loadingRequests ? (
                    <Text style={styles.loadingText}>
                        {'Загрузка заявок...'}
                    </Text>
                ) : (
                    <FlatList
                        data={requests}
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
                )}
            </View>
        </SafeAreaView>
    );
};
