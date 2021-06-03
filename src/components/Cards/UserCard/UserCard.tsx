import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Text, Title } from 'react-native-paper';

import { User } from '../../../redux/users/types';
import AccountIcon from '../../icons/Cards/AccountIcon';
import styles from './UserCard.styles';

export interface UserCardProps {
    user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.children}>
                <View style={styles.info}>
                    <ScrollView
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        snapToStart={true}
                        style={styles.nameContainer}>
                        <Title style={styles.name}>{user.name}</Title>
                    </ScrollView>
                    <Text style={styles.position}>{user.position}</Text>
                </View>
                <View style={styles.imageContainer}>
                    <AccountIcon style={styles.placeholder} size={'big'} />
                    <Image
                        style={styles.picture}
                        source={{ uri: user.picture }}
                    />
                </View>
            </View>
        </View>
    );
};
