import React from 'react';
import styles from './UserCard.styles';
import { Image, ImageBackground, Text, View } from 'react-native';
import { User } from '../../redux/users/types';

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
            <ImageBackground
                style={styles.picture}
                source={require('../../images/account_circle_small.svg')}>
                <Image style={styles.picture} source={{ uri: user.picture }} />
            </ImageBackground>
        </View>
    );
};
