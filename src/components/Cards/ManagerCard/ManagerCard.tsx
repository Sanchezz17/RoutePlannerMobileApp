import React from 'react';

import { User } from '../../../redux/users/types';
import { ExpandableCard } from '../ExpandableCard/ExpandableCard';

interface MenuItem {
    name: string;
    action: () => void;
}

export interface ManagerCardProps {
    user: User;
    cardNumber: number;
    expandedCardNumber: number;
    setExpandedCardNumber: (number: number) => void;
    menuItems: MenuItem[];
}

export const ManagerCard = ({
    user,
    cardNumber,
    expandedCardNumber,
    setExpandedCardNumber,
    menuItems,
}: ManagerCardProps) => {
    return (
        <ExpandableCard
            name={user.name}
            additionalInfos={[user.position]}
            hasPicture={true}
            picture={user.picture}
            contacts={{
                email: user.email,
                mobilePhone: user.mobilePhone,
                telegram: user.telegram,
            }}
            cardNumber={cardNumber}
            expandedCardNumber={expandedCardNumber}
            setExpandedCardNumber={setExpandedCardNumber}
            menuItems={menuItems}
        />
    );
};
