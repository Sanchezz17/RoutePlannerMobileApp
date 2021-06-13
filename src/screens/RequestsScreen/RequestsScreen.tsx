import React, { useRef } from 'react';
import Toast from 'react-native-toast-message';

import { RequestCard } from '../../components/Cards/RequestCard/RequestCard';
import { ListScreen } from '../../containers/ListScreen/ListScreen';
import { useAppDispatch } from '../../redux/hooks';
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
import { Right, User } from '../../redux/users/types';
import { DrawerRoutes } from '../../routing/main/routes';
import { DrawerNavigationProps } from '../../routing/main/types';

type RequestsScreenProps = DrawerNavigationProps<DrawerRoutes.Requests>;
export const RequestsScreen = ({ navigation }: RequestsScreenProps) => {
    const dispatch = useAppDispatch();

    return (
        <ListScreen
            loadDataThunk={getRequestsThunk}
            loadMoreDataThunk={getMoreRequestsThunk}
            dataSelector={selectRequests}
            loadingSelector={selectLoadingRequests}
            renderCard={(user: User) => (
                <RequestCard
                    user={user}
                    onAccept={() => {
                        const userId = user.id;
                        dispatch(
                            addRightToUserThunk({
                                id: userId,
                                right: Right.Manager,
                            }),
                        );
                        dispatch(acceptRequest(userId));
                        Toast.show({
                            type: 'info',
                            text2: 'Заявка принята',
                            visibilityTime: 1500,
                        });
                    }}
                    onReject={() => {
                        dispatch(deleteUserThunk(user.id));
                        Toast.show({
                            type: 'info',
                            text2: 'Заявка отклонена',
                            visibilityTime: 1500,
                        });
                    }}
                />
            )}
            cardKeyExtractor={(user: User) => `${user.id}${user.email}`}
            //@ts-ignore
            navigation={navigation}
            screenTitle={'Заявки'}
        />
    );
};
