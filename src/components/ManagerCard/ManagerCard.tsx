import React, { useEffect, useState } from 'react';
import styles from './ManagerCard.styles';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { User } from '../../redux/users/types';
import AccountIcon from '../icons/AccountIcon';
import KebabMenuIcon from '../icons/KebabMenuIcon';
import ExpandCardIcon from '../icons/ExpandCardIcon';
import { Contacts } from '../Contacts/Contacts';
import { Divider } from 'react-native-paper';
import { Menu } from 'react-native-paper';

interface MenuItem {
    name: string;
    action: () => void;
}

export interface UserCardProps {
    user: User;
    cardNumber: number;
    expandedCardNumber: number;
    setExpandedCardNumber: Function;
    menuItems: MenuItem[];
}

export const ManagerCard = ({
    user,
    cardNumber,
    expandedCardNumber,
    setExpandedCardNumber,
    menuItems,
}: UserCardProps) => {
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
    }, [cardNumber, expandedCardNumber]);
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
        <View style={styles.card}>
            <View style={styles.cardInfo}>
                <View style={styles.kebabIconView}>
                    <Menu
                        visible={menuOpened}
                        onDismiss={closeMenu}
                        anchor={
                            <TouchableOpacity
                                key={user.id}
                                style={styles.kebabIcon}
                                onPressIn={() => {
                                    openMenu();
                                }}>
                                <KebabMenuIcon />
                            </TouchableOpacity>
                        }>
                        {menuItems.map((item) => (
                            <Menu.Item
                                key={item.name}
                                onPress={item.action}
                                title={item.name}
                            />
                        ))}
                    </Menu>
                </View>
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
