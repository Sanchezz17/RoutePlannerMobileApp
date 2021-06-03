import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleProp,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { Divider } from 'react-native-paper';
import Animated, {
    Easing,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { Contacts } from '../../Contacts/Contacts';
import AccountIcon from '../../icons/Cards/AccountIcon';
import ExpandCardIcon from '../../icons/Cards/ExpandCardIcon';
import Menu from '../../Menu/Menu';
import styles from './ExpandableCard.styles';

interface MenuItem {
    name: string;
    action: () => void;
}

interface Contacts {
    mobilePhone?: string;
    email?: string;
    telegram?: string;
}

export interface ExpandableCardProps {
    name: string;
    additionalInfos: string[];
    hasPicture: boolean;
    picture?: string;
    contacts: Contacts;
    cardNumber: number;
    expandedCardNumber: number;
    setExpandedCardNumber: (number: number) => void;
    menuItems: MenuItem[];
    style?: StyleProp<ViewStyle>;
    children?: Element;
}

export const ExpandableCard = ({
    name,
    additionalInfos,
    hasPicture,
    picture,
    contacts,
    cardNumber,
    expandedCardNumber,
    setExpandedCardNumber,
    menuItems,
    style,
    children,
}: ExpandableCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [menuOpened, setMenuOpened] = useState(false);
    const openMenu = () => setMenuOpened(true);
    const closeMenu = () => setMenuOpened(false);

    const expandAnimation = useSharedValue(0);
    const animationDuration = 400;
    useEffect(() => {
        if (cardNumber === expandedCardNumber) {
            expandAnimation.value = 1;
            setIsExpanded(true);
        } else if (isExpanded) {
            expandAnimation.value = 0;
            setIsExpanded(false);
        }
    }, [cardNumber, expandedCardNumber, expandAnimation.value, isExpanded]);
    const rotateX = useDerivedValue(() => {
        return withTiming(isExpanded ? 180 : 0, {
            duration: animationDuration,
            easing: Easing.linear,
        });
    });

    const animatedRotationStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateX: `${rotateX.value}deg` }],
        };
    });

    const animatedNameExpansionStyle = useAnimatedStyle(() => {
        return {
            maxHeight: withTiming(isExpanded ? 110 : 45, {
                duration: animationDuration,
            }),
        };
    });

    const animatedExpansionStyle = useAnimatedStyle(() => {
        return {
            maxHeight: withTiming(expandAnimation.value * 300, {
                duration: animationDuration,
            }),
            opacity: withTiming(expandAnimation.value, {
                duration: animationDuration,
            }),
        };
    });

    const animatedImageStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withTiming(expandAnimation.value * -10, {
                        duration: animationDuration,
                    }),
                },
                {
                    translateY: withTiming(expandAnimation.value * 20, {
                        duration: animationDuration,
                    }),
                },
                {
                    scale: withTiming(isExpanded ? 1.5 : 1, {
                        duration: animationDuration,
                    }),
                },
            ],
        };
    });

    return (
        <View style={[styles.card, style]}>
            {children && <View style={styles.children}>{children}</View>}
            <View style={styles.cardInfo}>
                <View style={styles.kebabIconView}>
                    <Menu
                        items={menuItems}
                        visible={menuOpened}
                        onPressIn={openMenu}
                        onDismiss={closeMenu}
                    />
                </View>
                <View
                    style={[
                        styles.info,
                        children === undefined ? undefined : styles.infoShifted,
                    ]}>
                    <Animated.View
                        style={[
                            animatedNameExpansionStyle,
                            styles.nameContainer,
                        ]}>
                        <Text style={styles.name}>{name}</Text>
                    </Animated.View>
                    <View style={styles.additionalInfosContainer}>
                        {additionalInfos.map((info) => (
                            <Text
                                style={styles.additionalInfo}
                                key={`${name}${info}`}>
                                {info}
                            </Text>
                        ))}
                    </View>
                </View>
                <Animated.View style={animatedImageStyle}>
                    {hasPicture && (
                        <View style={styles.imageContainer}>
                            <AccountIcon
                                style={styles.placeholder}
                                size={'medium'}
                            />
                            <Image
                                style={styles.picture}
                                source={{ uri: picture }}
                            />
                        </View>
                    )}
                </Animated.View>
            </View>
            <Animated.View
                style={[styles.contactsContainer, animatedExpansionStyle]}>
                <Divider style={styles.divider} />
                <Contacts
                    email={contacts.email}
                    phone={contacts.mobilePhone}
                    telegram={contacts.telegram}
                    style={styles.contacts}
                />
            </Animated.View>
            <TouchableOpacity
                onPressIn={() =>
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
