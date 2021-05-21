import deepEqual from 'deep-equal';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { FAB } from 'react-native-paper';

import MailIcon from '../../components/Contacts/MailIcon';
import PhoneIcon from '../../components/Contacts/PhoneIcon';
import TelegramIcon from '../../components/Contacts/TelegramIcon';
import { GooglePlacesInput } from '../../components/GooglePlacesInput/GooglePlacesInput';
import TextInput from '../../components/TextInput/TextInput';
import {
    createClientThunk,
    updateClientThunk,
} from '../../redux/clients/thunks';
import { Client } from '../../redux/clients/types';
import { useAppDispatch } from '../../redux/hooks';
import { Coordinate } from '../../redux/users/types';
import { ClientsRoutes } from '../../routing/clients/routes';
import { ClientsStackNavigationProps } from '../../routing/clients/types';
import styles, { theme } from './AddClientScreen.styles';

const MOBILE_PHONE_FIELD = 'mobilePhone';
const TELEGRAM_FIELD = 'telegram';
const EMAIL_FIELD = 'email';
const NAME_FIELD = 'name';

const defaultCoordinate: Coordinate = {
    latitude: 56.8519,
    longitude: 60.6122,
    address: '',
};

type AddClientScreenProps = ClientsStackNavigationProps<ClientsRoutes.AddClient>;

export const AddClientScreen = ({
    route,
    navigation,
}: AddClientScreenProps) => {
    const isNewClient = route.params?.client === undefined;
    const client: Client = route.params?.client ?? {
        id: 0,
        name: '',
        coordinate: defaultCoordinate,
        email: '',
        telegram: '',
        mobilePhone: '',
    };
    const dispatch = useAppDispatch();

    const [coordinate, setCoordinate] = useState<Coordinate>(
        client?.coordinate ?? defaultCoordinate,
    );

    const { register, handleSubmit, setValue } = useForm();
    const onSubmit = useCallback(
        async (formData) => {
            console.log('submit');
            if (isNewClient) {
                console.log(`${client} created`);
                dispatch(createClientThunk({ client: client }));
            } else if (
                !deepEqual(coordinate, client.coordinate) ||
                (formData.telegram && client.telegram !== formData.telegram) ||
                (formData.mobilePhone &&
                    client.mobilePhone !== formData.mobilePhone) ||
                (formData.email && client.email !== formData.email) ||
                (formData.name && client.name !== formData.name)
            ) {
                console.log(`${client} updated`);
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
        [isNewClient, coordinate, client, navigation, dispatch],
    );

    const onChangeField = useCallback(
        (name) => (text: string) => {
            setValue(name, text);
        },
        [setValue],
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
        setCoordinate(client?.coordinate ?? defaultCoordinate);
    }, [register, setValue, client]);

    return (
        <SafeAreaView style={styles.view}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        label={'Имя'}
                        defaultValue={client.name}
                        textContentType={'name'}
                        onChangeText={onChangeField(NAME_FIELD)}
                        leftIcon={<MailIcon />}
                    />
                    <GooglePlacesInput
                        address={coordinate.address}
                        onChangeCoordinate={(newCoordinate) => {
                            setCoordinate(newCoordinate);
                        }}
                    />
                    <TextInput
                        label={'Email'}
                        defaultValue={client.email}
                        onChangeText={onChangeField(EMAIL_FIELD)}
                        leftIcon={<MailIcon />}
                    />
                    <TextInput
                        label={'Телефон'}
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
