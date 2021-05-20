import React from 'react';

import { ClientCard } from '../../components/ClientCard/ClientCard';
import { ListScreen } from '../../containers/ListScreen/ListScreen';
import {
    selectClients,
    selectLoadingClients,
} from '../../redux/clients/selectors';
import {
    getClientsThunk,
    getMoreClientsThunk,
} from '../../redux/clients/thunks';
import { Client } from '../../redux/clients/types';
import { useAppDispatch } from '../../redux/hooks';

export const ClientsScreen = () => {
    const dispatch = useAppDispatch();
    return (
        <ListScreen
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
                            action: () => {},
                        },
                        {
                            name: 'Назначить встречу',
                            action: () => {},
                        },
                        {
                            name: 'Удалить',
                            action: () => {},
                        },
                    ]}
                />
            )}
            cardKeyExtractor={(item: Client) => `${item.id}${item.email}`}
            dataSelector={selectClients}
            loadingSelector={selectLoadingClients}
            loadDataThunk={getClientsThunk}
            loadMoreDataThunk={getMoreClientsThunk}
        />
    );
};
