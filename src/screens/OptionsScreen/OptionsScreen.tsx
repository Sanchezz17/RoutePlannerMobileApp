import deepEqual from 'deep-equal';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LogBox, SafeAreaView, ScrollView, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import { Button, Divider } from 'react-native-paper';

import { SettingsCard } from '../../components/Cards/SettingsCard/SettingsCard';
import { GooglePlacesInput } from '../../components/GooglePlacesInput/GooglePlacesInput';
import MailIcon from '../../components/icons/Inputs/Text/MailIcon';
import NameIcon from '../../components/icons/Inputs/Text/NameIcon';
import PhoneIcon from '../../components/icons/Inputs/Text/PhoneIcon';
import TelegramIcon from '../../components/icons/Inputs/Text/TelegramIcon';
import TextInput from '../../components/TextInput/TextInput';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectCurrentUser } from '../../redux/users/selectors';
import { updateUserThunk } from '../../redux/users/thunks';
import { Coordinate, defaultCoordinate } from '../../redux/users/types';
import { DrawerRoutes } from '../../routing/main/routes';
import { DrawerNavigationProps } from '../../routing/main/types';
import { ManagersRoutes } from '../../routing/managers/routes';
import { ManagersStackNavigationProps } from '../../routing/managers/types';
import styles, { theme } from './OptionsScreen.styles';

LogBox.ignoreLogs([
    /VirtualizedLists should never be nested inside plain ScrollViews with the same orientation.*/,
]);

const NAME_FIELD = 'name';
const MOBILE_PHONE_FIELD = 'mobilePhone';
const TELEGRAM_FIELD = 'telegram';

type OptionsScreenProps =
    | DrawerNavigationProps<DrawerRoutes.Options>
    | ManagersStackNavigationProps<ManagersRoutes.Options>;

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
            if (
                !deepEqual(coordinate, user.coordinate) ||
                (formData.name && user.name !== formData.name) ||
                (formData.telegram && user.telegram !== formData.telegram) ||
                (formData.mobilePhone &&
                    user.mobilePhone !== formData.mobilePhone)
            ) {
                const updatedUser = dispatch(
                    updateUserThunk({
                        id: user.id,
                        updateUserDto: {
                            name: formData.name,
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
        [dispatch, coordinate, user],
    );

    const onChangeField = useCallback(
        (name) => (text: string) => {
            setValue(name, text);
        },
        [setValue],
    );

    useEffect(() => {
        register(NAME_FIELD);
        register(MOBILE_PHONE_FIELD);
        register(TELEGRAM_FIELD);
        setValue(NAME_FIELD, user.name);
        setValue(MOBILE_PHONE_FIELD, user.mobilePhone);
        setValue(TELEGRAM_FIELD, user.telegram);
        setCoordinate(user?.coordinate ?? defaultCoordinate);
    }, [register, setValue, user]);

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
                        mode={'outlined'}
                        defaultValue={user.email}
                        active={false}
                        leftIcon={<MailIcon focused={false} />}
                    />
                    <TextInput
                        label={'Имя'}
                        mode={'outlined'}
                        autoCorrect={false}
                        onChangeText={onChangeField(NAME_FIELD)}
                        defaultValue={user.name}
                        leftIcon={<NameIcon />}
                    />
                    <TextInput
                        label={'Телефон'}
                        mode={'outlined'}
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
                        mode={'outlined'}
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
                        mode={'outlined'}
                    />
                </View>

                <Button
                    style={styles.fab}
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
