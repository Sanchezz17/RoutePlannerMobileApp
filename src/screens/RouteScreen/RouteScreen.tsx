import React from 'react';

import { RoutePointCard } from '../../components/Cards/RoutePointCard/RoutePointCard';
import { ListScreen } from '../../containers/ListScreen/ListScreen';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Meeting } from '../../redux/meetings/types';
import { selectLoadingRoute, selectRoute } from '../../redux/routes/selectors';
import { getCurrentRouteMeetingsThunk } from '../../redux/routes/thunks';
import { selectCurrentUser } from '../../redux/users/selectors';
import { ManagersRoutes } from '../../routing/managers/routes';
import { ManagersStackNavigationProps } from '../../routing/managers/types';

type ManagersScreenProps = ManagersStackNavigationProps<ManagersRoutes.Managers>;

export const RouteScreen = ({ navigation }: ManagersScreenProps) => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);
    return (
        <ListScreen
            renderCard={(
                routePoint: Meeting,
                index,
                expandedCardIndex,
                setExpandedCardIndex,
            ) => (
                <RoutePointCard
                    meeting={routePoint}
                    key={index}
                    setExpandedCardNumber={(cardNumber: number) =>
                        setExpandedCardIndex(cardNumber)
                    }
                    cardNumber={index}
                    expandedCardNumber={expandedCardIndex}
                    menuItems={[
                        {
                            name: 'Встреча окончена',
                            action: () => {},
                        },
                        {
                            name: 'Проложить маршрут',
                            action: () => {},
                        },
                    ]}
                />
            )}
            cardKeyExtractor={(item: Meeting) => `${item.id}${item.name}`}
            dataSelector={(rootState) =>
                selectRoute(rootState, currentUser.id)?.suitableMeetings ?? []
            }
            loadingSelector={selectLoadingRoute}
            loadDataThunk={getCurrentRouteMeetingsThunk}
            loadMoreDataThunk={getCurrentRouteMeetingsThunk}
        />
    );
};
