import React from 'react';
import { Image, Text, View } from 'react-native';

import { User } from '../../../redux/users/types';
import AccountIcon from '../../icons/Cards/AccountIcon';
import styles from './UserCard.styles';

export interface UserCardProps {
    user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
    return (
        <View style={styles.cardInfo}>
            <View style={styles.info}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.position}>{user.position}</Text>
            </View>
            <View style={styles.imageContainer}>
                <AccountIcon style={styles.placeholder} size={'big'} />
                <Image style={styles.picture} source={{ uri: user.picture }} />
            </View>
        </View>
    );
};
