import React, { useRef } from 'react';
import Toast from 'react-native-easy-toast';

import { Request } from '../../components/Request/Request';
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
export const RequestsScreen = (_: RequestsScreenProps) => {
    const dispatch = useAppDispatch();
    const toast = useRef<Toast>(null);

    return (
        <ListScreen
            loadDataThunk={getRequestsThunk}
            loadMoreDataThunk={getMoreRequestsThunk}
            dataSelector={selectRequests}
            loadingSelector={selectLoadingRequests}
            renderCard={(user: User) => (
                <Request
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
                        toast.current?.show('Заявка принята', 1500);
                    }}
                    onReject={() => {
                        dispatch(deleteUserThunk(user.id));
                        toast.current?.show('Заявка отклонена', 1500);
                    }}
                />
            )}
            cardKeyExtractor={(user: User) => `${user.id}${user.email}`}>
            <Toast ref={toast} position={'center'} />
        </ListScreen>
    );
};
