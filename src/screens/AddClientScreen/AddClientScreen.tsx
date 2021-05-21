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
    const client = route.params?.client;
    const dispatch = useAppDispatch();

    const [coordinate, setCoordinate] = useState<Coordinate>(
        client?.coordinate ?? defaultCoordinate,
    );
    const [id, setId] = useState(client?.id ?? undefined);
    const [name, setName] = useState(client?.name ?? '');
    const [email, setEmail] = useState(client?.email ?? '');
    const [telegram, setTelegram] = useState(client?.telegram ?? '');
    const [mobilePhone, setMobilePhone] = useState(client?.mobilePhone ?? '');

    const { register, handleSubmit, setValue } = useForm();
    const onSubmit = useCallback(
        async (formData) => {
            if (id === undefined) {
                dispatch(
                    createClientThunk({
                        name: name,
                        email: email,
                        telegram: telegram,
                        mobilePhone: mobilePhone,
                        coordinate: coordinate,
                    }),
                );
            } else {
                dispatch(
                    updateClientThunk({
                        id: id,
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
        [
            navigation,
            name,
            dispatch,
            id,
            email,
            telegram,
            mobilePhone,
            coordinate,
        ],
    );

    useEffect(() => {
        register(NAME_FIELD);
        register(EMAIL_FIELD);
        register(MOBILE_PHONE_FIELD);
        register(TELEGRAM_FIELD);
        setValue(NAME_FIELD, name);
        setValue(EMAIL_FIELD, email);
        setValue(MOBILE_PHONE_FIELD, mobilePhone);
        setValue(TELEGRAM_FIELD, telegram);
        setCoordinate(client?.coordinate ?? defaultCoordinate);
    }, [register, setValue, client, name, email, mobilePhone, telegram]);

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
                        defaultValue={name}
                        textContentType={'name'}
                        onChangeText={setName}
                        leftIcon={<MailIcon />}
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
                        defaultValue={email}
                        onChangeText={setEmail}
                        leftIcon={<MailIcon />}
                    />
                    <TextInput
                        label={'Телефон'}
                        mode={'flat'}
                        style={styles.input}
                        defaultValue={mobilePhone}
                        autoCompleteType="tel"
                        keyboardType="numeric"
                        textContentType="telephoneNumber"
                        maxLength={11}
                        onChangeText={setMobilePhone}
                        leftIcon={<PhoneIcon />}
                    />
                    <TextInput
                        label={'Telegram'}
                        mode={'flat'}
                        style={styles.input}
                        autoCorrect={false}
                        defaultValue={telegram}
                        onChangeText={setTelegram}
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
