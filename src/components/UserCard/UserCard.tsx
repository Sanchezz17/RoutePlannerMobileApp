import React from 'react';
import styles from './UserCard.styles';
import { Image, Text, View } from 'react-native';
import { User } from '../../redux/users/types';
import AccountIcon from '../icons/AccountIcon';

export interface UserCardProps {
    user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.position}>{user.position}</Text>
            </View>
            <View style={styles.container}>
                <AccountIcon style={styles.placeholder} size={'big'} />
                <Image style={styles.picture} source={{ uri: user.picture }} />
            </View>
        </View>
    );
};
