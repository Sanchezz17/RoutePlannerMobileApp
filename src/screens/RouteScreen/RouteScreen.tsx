import React, { useState } from 'react';
import { Linking } from 'react-native';

import createGoogleMapsRouteUrl from '../../common/utils/createGoogleMapsRouteUrl';
import { RoutePointCard } from '../../components/Cards/RoutePointCard/RoutePointCard';
import { ListScreen } from '../../containers/ListScreen/ListScreen';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateMeetingEndTimeThunk } from '../../redux/meetings/thunks';
import { Meeting } from '../../redux/meetings/types';
import { selectLoadingRoute, selectRoute } from '../../redux/routes/selectors';
import { getCurrentRouteThunk } from '../../redux/routes/thunks';
import { selectCurrentUser } from '../../redux/users/selectors';
import { DrawerRoutes } from '../../routing/main/routes';
import { DrawerNavigationProps } from '../../routing/main/types';
import { ManagersRoutes } from '../../routing/managers/routes';
import { ManagersStackNavigationProps } from '../../routing/managers/types';

type RouteScreenProps =
    | DrawerNavigationProps<DrawerRoutes.Route>
    | ManagersStackNavigationProps<ManagersRoutes.Route>;

export const RouteScreen = ({ route }: RouteScreenProps) => {
    const currentUser = useAppSelector(selectCurrentUser);
    const user = route.params?.user ?? currentUser;
    const dispatch = useAppDispatch();

    const [lastCardNumber, setLastCardNumber] = useState(0);
    const [activeCardNumber, setActiveCardNumber] = useState(
        Number.MAX_SAFE_INTEGER,
    );
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
                    lastCardNumber={lastCardNumber}
                    setLastCardNumber={setLastCardNumber}
                    activeCardNumber={activeCardNumber}
                    setActiveCardNumber={setActiveCardNumber}
                    menuItems={[
                        {
                            name: 'Встреча окончена',
                            action: () => {
                                dispatch(
                                    updateMeetingEndTimeThunk({
                                        id: routePoint.id,
                                        endTime: new Date(),
                                    }),
                                );
                            },
                        },
                        {
                            name: 'Проложить маршрут',
                            action: async () => {
                                const url = createGoogleMapsRouteUrl(
                                    routePoint.coordinate,
                                );
                                try {
                                    await Linking.openURL(url);
                                } catch (ex) {
                                    console.log(
                                        `error while open google maps route url ${ex}`,
                                    );
                                }
                            },
                        },
                    ]}
                />
            )}
            cardKeyExtractor={(item: Meeting) =>
                `${item.id}${item.client.name}`
            }
            dataSelector={(rootState) =>
                selectRoute(rootState, user.id)
                    ?.meetings.slice()
                    .sort(
                        (first, second) =>
                            new Date(first.startTime).getTime() -
                            new Date(second.startTime).getTime(),
                    ) ?? []
            }
            loadingSelector={selectLoadingRoute}
            loadDataThunk={getCurrentRouteThunk}
            loadMoreDataThunk={getCurrentRouteThunk}
        />
    );
};
