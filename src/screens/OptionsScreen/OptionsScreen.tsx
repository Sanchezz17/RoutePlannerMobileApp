import { LogBox, SafeAreaView, ScrollView, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Toast from 'react-native-easy-toast';
import { useForm } from 'react-hook-form';
import styles, { theme } from './OptionsScreen.styles';
import { UserCard } from '../../components/UserCard/UserCard';
import { Coordinate, Right } from '../../redux/users/types';
import { GooglePlacesInput } from '../../components/GooglePlacesInput/GooglePlacesInput';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateUserThunk } from '../../redux/users/thunks';
import deepEqual from 'deep-equal';
import { selectCurrentUser } from '../../redux/users/selectors';
import { DrawerRoutes } from '../../routing/routes';
import { DrawerNavigationProps } from '../../routing/types';
import { TextInput, Button, Divider } from 'react-native-paper';
import TelegramIcon from '../../components/Contacts/TelegramIcon';
import PhoneIcon from '../../components/Contacts/PhoneIcon';
import {SettingsCard} from "../../components/SettingsCard/SettingsCard";
const MOBILE_PHONE_FIELD = 'mobilePhone';
const TELEGRAM_FIELD = 'telegram';

LogBox.ignoreLogs([
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
]);

const defaultCoordinate: Coordinate = {
    latitude: 56.8519,
    longitude: 60.6122,
    address: '',
};

type OptionsScreenProps = DrawerNavigationProps<DrawerRoutes.Options>;

export const OptionsScreen = ({ route }: OptionsScreenProps) => {
    const currentUser = useAppSelector(selectCurrentUser);
    const user = route.params?.user ?? currentUser;
    const dispatch = useAppDispatch();

    const toast = useRef<Toast>(null);

    const [coordinate, setCoordinate] = useState<Coordinate>(
        user?.coordinate ?? defaultCoordinate,
    );

    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = useCallback(
        async (formData) => {
            //console.log(`Types: ${JSON.stringify(users)}`);
            //console.log(formData);
            //console.log(coordinate);

            // Пользователь может обновлять только себя, если он не админ
            if (
                !currentUser.rights.includes(Right.Admin) &&
                currentUser.id !== user.id
            ) {
                return;
            }

            if (
                !deepEqual(coordinate, user.coordinate) ||
                (formData.telegram && user.telegram !== formData.telegram) ||
                (formData.mobilePhone &&
                    user.mobilePhone !== formData.mobilePhone)
            ) {
                const updatedUser = dispatch(
                    updateUserThunk({
                        id: user.id,
                        updateUserDto: {
                            mobilePhone: formData.mobilePhone,
                            telegram: formData.telegram,
                            coordinate: coordinate,
                        },
                    }),
                );
                toast.current?.show('Данные сохранены', 1500);
                console.log(`user ${user.id} changed`);
                console.log(`form data ${JSON.stringify(formData)}`);
                console.log(`updated user ${JSON.stringify(updatedUser)}`);
            }
        },
        [currentUser, dispatch, coordinate, user],
    );

    const onChangeField = useCallback(
        (name) => (text: string) => {
            setValue(name, text);
        },
        [setValue],
    );

    useEffect(() => {
        register(MOBILE_PHONE_FIELD);
        register(TELEGRAM_FIELD);
        if (user.mobilePhone) {
            setValue(MOBILE_PHONE_FIELD, user.mobilePhone);
        }
        if (user.telegram) {
            setValue(TELEGRAM_FIELD, user.telegram);
        }
    }, [register, setValue, user.mobilePhone, user.telegram]);

    return (
        <SafeAreaView style={styles.view}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.container}>
                <SettingsCard user={user} />
                <Divider style={styles.divider} />
                <Toast ref={toast} position={'center'} />
                <View style={styles.form}>
                    <TextInput
                        mode={'outlined'}
                        label={'Email'}
                        style={[styles.input, styles.inactiveInput]}
                        theme={theme}
                        value={user.email}
                        editable={false}
                        onChangeText={() => undefined}
                    />
                    <TextInput
                        mode={'outlined'}
                        label={'Телефон'}
                        style={[styles.input, styles.activeInput]}
                        theme={theme}
                        defaultValue={user.mobilePhone}
                        autoCompleteType="tel"
                        keyboardType="numeric"
                        textContentType="telephoneNumber"
                        maxLength={11}
                        onChangeText={onChangeField(MOBILE_PHONE_FIELD)}
                        left={<TextInput.Icon name={() => <PhoneIcon />} />}
                    />
                    <TextInput
                        mode={'outlined'}
                        label={'Telegram'}
                        style={[styles.input, styles.activeInput]}
                        theme={theme}
                        autoCorrect={false}
                        defaultValue={user.telegram}
                        onChangeText={onChangeField(TELEGRAM_FIELD)}
                        left={<TextInput.Icon name={() => <TelegramIcon />} />}
                    />
                    <Text style={styles.fieldLabel}>Адрес</Text>
                    <GooglePlacesInput
                        address={coordinate.address}
                        onChangeCoordinate={(newCoordinate) => {
                            setCoordinate(newCoordinate);
                        }}
                    />
                </View>

                <Button
                    style={styles.saveButton}
                    labelStyle={styles.saveButtonLabel}
                    mode={'contained'}
                    onPress={handleSubmit(onSubmit)}
                    theme={theme}>
                    Сохранить
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
};
