import React from 'react';
import styles from './ManagerCard.styles';
import { Image, Text, View } from 'react-native';
import { User } from '../../redux/users/types';
import AccountIcon from '../icons/AccountIcon';
import KebabMenuIcon from '../icons/KebabMenuIcon';
import ExpandCardIcon from '../icons/ExpandCardIcon';

export interface UserCardProps {
    user: User;
}

export const ManagerCard = ({ user }: UserCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardInfo}>
                <KebabMenuIcon style={styles.kebabIcon} />
                <View style={styles.info}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.position}>Менеджер</Text>
                </View>
                <View style={styles.imageContainer}>
                    <AccountIcon style={styles.placeholder} size={'medium'} />
                    <Image
                        style={styles.picture}
                        source={{ uri: user.picture }}
                    />
                </View>
            </View>
            <ExpandCardIcon style={styles.expandCardIcon} />
        </View>
    );
};
