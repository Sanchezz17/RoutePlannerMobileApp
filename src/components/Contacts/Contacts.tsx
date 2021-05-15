import React from 'react';
import styles from './Contacts.styles';
import {
    Text,
    View,
    Linking,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
} from 'react-native';
import MailIcon from './MailIcon';
import PhoneIcon from './PhoneIcon';
import TelegramIcon from './TelegramIcon';

export interface ContactsProps {
    email?: string;
    phone?: string;
    telegram?: string;
    style?: StyleProp<ViewStyle>;
}

export const Contacts = ({
    email = '',
    phone = '',
    telegram = '',
    style,
}: ContactsProps) => {
    return (
        <View style={[styles.contacts, style]}>
            {email !== null && (
                <TouchableOpacity
                    style={styles.contact}
                    onPress={() => Linking.openURL(`mailto:${email}`)}>
                    <MailIcon style={styles.icon} />
                    <Text style={styles.text}>{email}</Text>
                </TouchableOpacity>
            )}
            {phone !== null && (
                <TouchableOpacity
                    style={styles.contact}
                    onPress={() => Linking.openURL(`tel:${phone}`)}>
                    <PhoneIcon style={styles.icon} />
                    <Text style={styles.text}>{phone}</Text>
                </TouchableOpacity>
            )}
            {telegram !== null && (
                <TouchableOpacity
                    style={styles.contact}
                    onPress={() => Linking.openURL(`https://t.me/${telegram}`)}>
                    <TelegramIcon style={styles.icon} />
                    <Text style={styles.text}>@{telegram}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
