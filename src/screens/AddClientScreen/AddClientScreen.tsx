import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { FAB } from 'react-native-paper';

import MailIcon from '../../components/Contacts/MailIcon';
import PhoneIcon from '../../components/Contacts/PhoneIcon';
import TelegramIcon from '../../components/Contacts/TelegramIcon';
import { GooglePlacesInput } from '../../components/GooglePlacesInput/GooglePlacesInput';
import ClientsIcon from '../../components/icons/ClientsIcon';
import TextInput from '../../components/TextInput/TextInput';
import {
    createClientThunk,
    updateClientThunk,
} from '../../redux/clients/thunks';
import { defaultClient } from '../../redux/clients/types';
import { useAppDispatch } from '../../redux/hooks';
import { Coordinate } from '../../redux/users/types';
import { ClientsRoutes } from '../../routing/clients/routes';
import { ClientsStackNavigationProps } from '../../routing/clients/types';
import styles, { theme } from './AddClientScreen.styles';

const MOBILE_PHONE_FIELD = 'mobilePhone';
const TELEGRAM_FIELD = 'telegram';
const EMAIL_FIELD = 'email';
const NAME_FIELD = 'name';

type AddClientScreenProps = ClientsStackNavigationProps<ClientsRoutes.AddClient>;

export const AddClientScreen = ({
    route,
    navigation,
}: AddClientScreenProps) => {
    const client = route.params?.client ?? defaultClient;
    const dispatch = useAppDispatch();

    const [coordinate, setCoordinate] = useState<Coordinate>(client.coordinate);
    const { register, handleSubmit, setValue } = useForm();
    const onSubmit = useCallback(
        async (formData) => {
            if (client.id === 0) {
                dispatch(
                    createClientThunk({
                        name: formData.name,
                        email: formData.email,
                        telegram: formData.telegram,
                        mobilePhone: formData.mobilePhone,
                        coordinate: coordinate,
                    }),
                );
            } else {
                dispatch(
                    updateClientThunk({
                        id: client.id,
                        updateClientDto: {
                            name: formData.name,
                            email: formData.email,
                            mobilePhone: formData.mobilePhone,
                            telegram: formData.telegram,
                            coordinate: coordinate,
                        },
                    }),
                );
            }
            navigation.goBack();
        },
        [client.id, navigation, dispatch, coordinate],
    );

    useEffect(() => {
        register(NAME_FIELD);
        register(EMAIL_FIELD);
        register(MOBILE_PHONE_FIELD);
        register(TELEGRAM_FIELD);
        setValue(NAME_FIELD, client.name);
        setValue(EMAIL_FIELD, client.email);
        setValue(MOBILE_PHONE_FIELD, client.mobilePhone);
        setValue(TELEGRAM_FIELD, client.telegram);
        setCoordinate(client.coordinate);
    }, [register, setValue, client]);

    const onChangeField = useCallback(
        (fieldName) => (text: string) => {
            setValue(fieldName, text);
        },
        [setValue],
    );

    return (
        <SafeAreaView style={styles.view}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        label={'Имя'}
                        mode={'flat'}
                        style={styles.input}
                        defaultValue={client.name}
                        textContentType={'name'}
                        onChangeText={onChangeField(NAME_FIELD)}
                        leftIcon={<ClientsIcon focused />}
                    />
                    <GooglePlacesInput
                        address={coordinate.address}
                        onChangeCoordinate={(newCoordinate) => {
                            setCoordinate(newCoordinate);
                        }}
                        mode={'flat'}
                        style={styles.input}
                    />
                    <TextInput
                        label={'Email'}
                        mode={'flat'}
                        style={styles.input}
                        defaultValue={client.email}
                        onChangeText={onChangeField(EMAIL_FIELD)}
                        leftIcon={<MailIcon />}
                    />
                    <TextInput
                        label={'Телефон'}
                        mode={'flat'}
                        style={styles.input}
                        defaultValue={client.mobilePhone}
                        autoCompleteType="tel"
                        keyboardType="numeric"
                        textContentType="telephoneNumber"
                        maxLength={11}
                        onChangeText={onChangeField(MOBILE_PHONE_FIELD)}
                        leftIcon={<PhoneIcon />}
                    />
                    <TextInput
                        label={'Telegram'}
                        mode={'flat'}
                        style={styles.input}
                        autoCorrect={false}
                        defaultValue={client.telegram}
                        onChangeText={onChangeField(TELEGRAM_FIELD)}
                        leftIcon={<TelegramIcon />}
                    />
                </View>
            </ScrollView>
            <FAB
                style={styles.fab}
                icon={'check'}
                color={'black'}
                onPress={handleSubmit(onSubmit)}
                theme={theme}
            />
        </SafeAreaView>
    );
};
