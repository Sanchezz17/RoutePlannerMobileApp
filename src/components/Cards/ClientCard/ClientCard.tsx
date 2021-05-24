import React from 'react';

import { Client } from '../../../redux/clients/types';
import { ExpandableCard } from '../ExpandableCard/ExpandableCard';

interface MenuItem {
    name: string;
    action: () => void;
}

export interface ClientCardProps {
    client: Client;
    cardNumber: number;
    expandedCardNumber: number;
    setExpandedCardNumber: Function;
    menuItems: MenuItem[];
}

export const ClientCard = ({
    client,
    cardNumber,
    expandedCardNumber,
    setExpandedCardNumber,
    menuItems,
}: ClientCardProps) => {
    return (
        <ExpandableCard
            name={client.name}
            additionalInfos={[`Адрес: ${client.coordinate?.address}`]}
            hasPicture={false}
            contacts={{
                email: client.email,
                mobilePhone: client.mobilePhone,
                telegram: client.telegram,
            }}
            cardNumber={cardNumber}
            expandedCardNumber={expandedCardNumber}
            setExpandedCardNumber={setExpandedCardNumber}
            menuItems={menuItems}
        />
    );
};
