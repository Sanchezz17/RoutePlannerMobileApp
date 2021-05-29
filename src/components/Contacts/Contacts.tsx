import React from 'react';
import {
    Linking,
    StyleProp,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

import MailIcon from '../icons/Contacts/MailIcon';
import PhoneIcon from '../icons/Contacts/PhoneIcon';
import TelegramIcon from '../icons/Contacts/TelegramIcon';
import styles from './Contacts.styles';

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
            {email.length > 0 && (
                <TouchableOpacity
                    style={styles.contact}
                    onPress={() => Linking.openURL(`mailto:${email}`)}>
                    <MailIcon style={styles.icon} />
                    <Text style={styles.text}>{email}</Text>
                </TouchableOpacity>
            )}
            {phone.length > 0 && (
                <TouchableOpacity
                    style={styles.contact}
                    onPress={() => Linking.openURL(`tel:${phone}`)}>
                    <PhoneIcon style={styles.icon} />
                    <Text style={styles.text}>{phone}</Text>
                </TouchableOpacity>
            )}
            {telegram.length > 0 && (
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
