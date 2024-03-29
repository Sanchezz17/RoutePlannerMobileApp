import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { User } from '../../../redux/users/types';
import AcceptRequestIcon from '../../icons/Cards/AcceptRequestIcon';
import AccountIcon from '../../icons/Cards/AccountIcon';
import RejectRequestIcon from '../../icons/Cards/RejectRequestIcon';
import styles from './RequestCard.styles';

export interface RequestProps {
    user: User;
    onAccept: () => void;
    onReject: () => void;
}

export const RequestCard = ({ user, onAccept, onReject }: RequestProps) => {
    return (
        <View style={styles.cardInfo}>
            <View style={styles.imageContainer}>
                <AccountIcon size={'small'} style={styles.placeholder} />
                <Image style={styles.picture} source={{ uri: user.picture }} />
            </View>
            <View style={styles.info}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            <TouchableOpacity style={styles.icon} onPress={onAccept}>
                <AcceptRequestIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={onReject}>
                <RejectRequestIcon />
            </TouchableOpacity>
        </View>
    );
};
