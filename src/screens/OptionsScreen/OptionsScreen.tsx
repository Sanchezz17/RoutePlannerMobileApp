import { LogBox, SafeAreaView, ScrollView, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Toast from 'react-native-easy-toast';
import { useForm } from 'react-hook-form';
import styles, { theme } from './OptionsScreen.styles';
import { Coordinate, Right } from '../../redux/users/types';
import { GooglePlacesInput } from '../../components/GooglePlacesInput/GooglePlacesInput';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateUserThunk } from '../../redux/users/thunks';
import deepEqual from 'deep-equal';
import { selectCurrentUser } from '../../redux/users/selectors';
import { DrawerRoutes } from '../../routing/routes';
import { DrawerNavigationProps } from '../../routing/types';
import { Button, Divider } from 'react-native-paper';
import TelegramIcon from '../../components/Contacts/TelegramIcon';
import PhoneIcon from '../../components/Contacts/PhoneIcon';
import { SettingsCard } from '../../components/SettingsCard/SettingsCard';
import MailIcon from '../../components/Contacts/MailIcon';
import TextInput from '../../components/TextInput/TextInput';
const MOBILE_PHONE_FIELD = 'mobilePhone';
const TELEGRAM_FIELD = 'telegram';

LogBox.ignoreLogs([
    /VirtualizedLists should never be nested inside plain ScrollViews with the same orientation.*/,
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
                        label={'Email'}
                        value={user.email}
                        active={false}
                        leftIcon={<MailIcon />}
                    />
                    <TextInput
                        label={'Телефон'}
                        defaultValue={user.mobilePhone}
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
                        defaultValue={user.telegram}
                        onChangeText={onChangeField(TELEGRAM_FIELD)}
                        leftIcon={<TelegramIcon />}
                    />
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
