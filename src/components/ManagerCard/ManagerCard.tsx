import React, { useEffect, useState } from 'react';
import styles from './ManagerCard.styles';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { User } from '../../redux/users/types';
import AccountIcon from '../icons/AccountIcon';
import KebabMenuIcon from '../icons/KebabMenuIcon';
import ExpandCardIcon from '../icons/ExpandCardIcon';
import { Contacts } from '../Contacts/Contacts';
import { Divider } from 'react-native-paper';

export interface UserCardProps {
    user: User;
    cardNumber: number;
    expandedCardNumber: number;
    setExpandedCardNumber: Function;
}

export const ManagerCard = ({
    user,
    cardNumber,
    expandedCardNumber,
    setExpandedCardNumber,
}: UserCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandAnimation, setExpandAnimation] = useState(
        new Animated.Value(0),
    );
    useEffect(() => {
        if (cardNumber === expandedCardNumber) {
            handleExpandAnimation();
            setIsExpanded(true);
        } else {
            handleCollapseAnimation();
            setIsExpanded(false);
        }
    }, [cardNumber, expandedCardNumber]);

    const interpolateRotating = expandAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const interpolateExpansion = expandAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 300],
    });

    const interpolateOpacity = expandAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const interpolateTranslateX = expandAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10],
    });

    const interpolateTranslateY = expandAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 20],
    });

    const interpolateScale = expandAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.5],
    });

    const animatedRotationStyle = {
        transform: [
            {
                rotateX: interpolateRotating,
            },
        ],
    };
    const animatedExpansionStyle = {
        maxHeight: interpolateExpansion,
        opacity: interpolateOpacity,
    };

    const animatedImageStyle = {
        transform: [
            {
                translateX: interpolateTranslateX,
            },
            {
                translateY: interpolateTranslateY,
            },
            {
                scale: interpolateScale,
            },
        ],
    };

    const handleExpandAnimation = () => {
        Animated.parallel([
            Animated.timing(expandAnimation, {
                toValue: 1,
                duration: 400,
                delay: 0,
                useNativeDriver: false,
            }),
        ]).start(() => {
            expandAnimation.setValue(1);
        });
    };

    const handleCollapseAnimation = () => {
        Animated.parallel([
            Animated.timing(expandAnimation, {
                toValue: 0,
                delay: 0,
                duration: 200,
                useNativeDriver: false,
            }),
        ]).start(() => {
            expandAnimation.setValue(0);
        });
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardInfo}>
                <KebabMenuIcon style={styles.kebabIcon} />
                <View style={styles.info}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.position}>{user.position}</Text>
                </View>
                <Animated.View style={animatedImageStyle}>
                    <View style={styles.imageContainer}>
                        <AccountIcon
                            style={styles.placeholder}
                            size={'medium'}
                        />
                        <Image
                            style={styles.picture}
                            source={{ uri: user.picture }}
                        />
                    </View>
                </Animated.View>
            </View>
            <Animated.View style={animatedExpansionStyle}>
                <Divider style={styles.divider} />
                <Contacts
                    email={user.email}
                    phone={user.mobilePhone}
                    telegram={user.telegram}
                    style={styles.contacts}
                />
            </Animated.View>
            <TouchableOpacity
                onPress={() =>
                    isExpanded
                        ? setExpandedCardNumber(-1)
                        : setExpandedCardNumber(cardNumber)
                }
                style={styles.expandCardTouchableContainer}>
                <Animated.View style={animatedRotationStyle}>
                    <ExpandCardIcon style={styles.expandCardIcon} />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};
