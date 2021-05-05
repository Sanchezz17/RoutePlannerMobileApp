import {
    Button,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Toast from 'react-native-easy-toast';
import { useForm } from 'react-hook-form';
import styles from './OptionsScreen.styles';
import { UserCard } from '../../components/UserCard/UserCard';
import { Coordinate } from '../../redux/users/types';
import { GooglePlacesInput } from '../../components/GooglePlacesInput/GooglePlacesInput';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateUserThunk } from '../../redux/users/thunks';
import deepEqual from 'deep-equal';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerRoutes, RootDrawerParamList } from '../App/App';
import { selectCurrentUser } from '../../redux/users/selectors';

const MOBILE_PHONE_FIELD = 'mobilePhone';
const TELEGRAM_FIELD = 'telegram';

const defaultCoordinate: Coordinate = {
    latitude: 56.8519,
    longitude: 60.6122,
    address: '',
};

export interface OptionsScreenProps
    extends DrawerScreenProps<RootDrawerParamList, DrawerRoutes.Options> {}

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
                toast.current?.show('Данные сохранены', 1000);
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
        <SafeAreaView>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                keyboardShouldPersistTaps={'handled'}>
                <View style={styles.view}>
                    <UserCard user={user} />
                    <Toast ref={toast} position={'center'} />
                    <View style={styles.form}>
                        <Text style={styles.fieldLabel}>Email</Text>
                        <TextInput
                            style={{ ...styles.input, ...styles.emailInput }}
                            value={user.email}
                            editable={false}
                            onChangeText={() => undefined}
                        />
                        <Text style={styles.fieldLabel}>Телефон</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={user.mobilePhone}
                            autoCompleteType="tel"
                            keyboardType="numeric"
                            textContentType="telephoneNumber"
                            maxLength={11}
                            onChangeText={onChangeField(MOBILE_PHONE_FIELD)}
                        />
                        <Text style={styles.fieldLabel}>Telegram</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={user.telegram}
                            onChangeText={onChangeField(TELEGRAM_FIELD)}
                        />
                        <Text style={styles.fieldLabel}>Адрес</Text>
                        <GooglePlacesInput
                            address={coordinate.address}
                            onChangeCoordinate={(newCoordinate) => {
                                setCoordinate(newCoordinate);
                            }}
                        />
                    </View>
                    <View style={styles.saveButton}>
                        <Button
                            title="Сохранить"
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
