import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { Meeting } from '../../../redux/meetings/types';
import { ExpandableCard } from '../ExpandableCard/ExpandableCard';
import styles from './RequestCard.styles';

interface MenuItem {
    name: string;
    action: () => void;
}

export interface MeetingCardProps {
    meeting: Meeting;
    cardNumber: number;
    expandedCardNumber: number;
    setExpandedCardNumber: (number: number) => void;
    menuItems: MenuItem[];
    lastCardNumber: number;
    setLastCardNumber: (number: number) => void;
    activeCardNumber: number;
    setActiveCardNumber: (number: number) => void;
}

export const RoutePointCard = ({
    meeting,
    cardNumber,
    expandedCardNumber,
    setExpandedCardNumber,
    menuItems,
    lastCardNumber,
    setLastCardNumber,
    activeCardNumber,
    setActiveCardNumber,
}: MeetingCardProps) => {
    useEffect(() => {
        if (cardNumber > lastCardNumber) {
            setLastCardNumber(cardNumber);
        }
    }, [cardNumber, lastCardNumber, setLastCardNumber]);

    const getIndicatorStyle = (indicatorType: 'stripe' | 'circle') => {
        if (cardNumber < activeCardNumber) {
            return indicatorType === 'stripe'
                ? styles.indicatorStripeVisited
                : styles.indicatorCircleVisited;
        }
        if (cardNumber === activeCardNumber) {
            return indicatorType === 'stripe'
                ? styles.indicatorStripeActive
                : styles.indicatorCircleActive;
        }
        if (cardNumber > activeCardNumber) {
            return indicatorType === 'stripe'
                ? styles.indicatorStripeWillVisit
                : styles.indicatorCircleWillVisit;
        }
        return undefined;
    };
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
            menuItems={menuItems}>
            <View style={[styles.indicatorContainer]}>
                {cardNumber !== 0 && (
                    <View
                        style={[
                            styles.indicatorStripe,
                            styles.stripeTop,
                            getIndicatorStyle('stripe'),
                        ]}
                    />
                )}
                <Text
                    style={[
                        styles.indicatorCircle,
                        getIndicatorStyle('circle'),
                    ]}>
                    {cardNumber + 1}
                </Text>
                {cardNumber !== lastCardNumber && (
                    <View
                        style={[
                            styles.indicatorStripe,
                            styles.stripeBottom,
                            getIndicatorStyle('stripe'),
                        ]}
                    />
                )}
            </View>
        </ExpandableCard>
    );
};
