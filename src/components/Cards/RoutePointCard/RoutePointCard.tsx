import React from 'react';

import { Meeting } from '../../../redux/meetings/types';
import { ExpandableCard } from '../ExpandableCard/ExpandableCard';

interface MenuItem {
    name: string;
    action: () => void;
}

export interface MeetingCardProps {
    meeting: Meeting;
    cardNumber: number;
    expandedCardNumber: number;
    setExpandedCardNumber: Function;
    menuItems: MenuItem[];
}

export const RoutePointCard = ({
    meeting,
    cardNumber,
    expandedCardNumber,
    setExpandedCardNumber,
    menuItems,
}: MeetingCardProps) => {
    return (
        <ExpandableCard
            name={meeting?.client?.name}
            additionalInfos={[
                `Адрес: ${meeting.coordinate?.address}`,
                `Начало встречи: ${new Date(
                    meeting.startTime,
                ).toLocaleTimeString()}`,
                `Конец встречи: ${new Date(
                    meeting.endTime,
                ).toLocaleTimeString()}`,
            ]}
            hasPicture={false}
            contacts={{
                email: meeting?.client?.email,
                mobilePhone: meeting?.client?.mobilePhone,
                telegram: meeting?.client?.telegram,
            }}
            cardNumber={cardNumber}
            expandedCardNumber={expandedCardNumber}
            setExpandedCardNumber={setExpandedCardNumber}
            menuItems={menuItems}
        />
    );
};
