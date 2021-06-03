import React from 'react';
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
                selectRoute(rootState, currentUser.id)
                    ?.suitableMeetings.slice()
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
