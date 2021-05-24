import React, { useLayoutEffect } from 'react';
import { FAB } from 'react-native-paper';

import { ClientCard } from '../../components/ClientCard/ClientCard';
import RouteIcon from '../../components/icons/RouteIcon';
import { ListScreen } from '../../containers/ListScreen/ListScreen';
import {
    selectClients,
    selectLoadingClients,
} from '../../redux/clients/selectors';
import {
    deleteClientThunk,
    getClientsThunk,
    getMoreClientsThunk,
} from '../../redux/clients/thunks';
import { Client } from '../../redux/clients/types';
import { useAppDispatch } from '../../redux/hooks';
import { ClientsRoutes } from '../../routing/clients/routes';
import { ClientsStackNavigationProps } from '../../routing/clients/types';
import styles from './ClientsScreen.styles';

type ClientsScreenProps = ClientsStackNavigationProps<ClientsRoutes.Clients>;

export const ClientsScreen = ({ navigation }: ClientsScreenProps) => {
    const dispatch = useAppDispatch();
    return (
        <ListScreen
            key={'clientsScreen.ListScreen'}
            renderCard={(
                client: Client,
                index,
                expandedCardIndex,
                setExpandedCardIndex,
            ) => (
                <ClientCard
                    client={client}
                    key={index}
                    setExpandedCardNumber={(cardNumber: number) =>
                        setExpandedCardIndex(cardNumber)
                    }
                    cardNumber={index}
                    expandedCardNumber={expandedCardIndex}
                    menuItems={[
                        {
                            name: 'Редактировать',
                            action: () => {
                                navigation.navigate(ClientsRoutes.AddClient, {
                                    client,
                                });
                            },
                        },
                        {
                            name: 'Назначить встречу',
                            action: () => {},
                        },
                        {
                            name: 'Удалить',
                            action: () => {
                                dispatch(deleteClientThunk(client.id));
                            },
                        },
                    ]}
                />
            )}
            cardKeyExtractor={(item: Client) => `${item.id}${item.email}`}
            dataSelector={selectClients}
            loadingSelector={selectLoadingClients}
            loadDataThunk={getClientsThunk}
            loadMoreDataThunk={getMoreClientsThunk}
            navigation={navigation.dangerouslyGetParent()}
            screenTitle={'Клиенты'}>
            <FAB
                key={'clientsScreen.FAB'}
                style={styles.fab}
                icon={'plus'}
                color={'black'}
                onPress={() => navigation.navigate(ClientsRoutes.AddClient, {})}
            />
        </ListScreen>
    );
};
