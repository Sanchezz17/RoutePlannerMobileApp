import React from 'react';
import styles from './UserCard.styles';
import {Image, Text, View} from 'react-native';
import {User} from '../../authorization/user';

export interface UserCardProps {
  user: User;
}

export const UserCard = ({user}: UserCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.position}>{user.position}</Text>
      </View>
      <Image style={styles.picture} source={{uri: user.picture}} />
    </View>
  );
};
