import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {
  ChangeUserContext,
  UserContext,
} from '../../common/components/AuthorizeRoute/AuthorizeRoute';
import {useForm} from 'react-hook-form';
import styles from './OptionsScreen.styles';
import {updateUserAsync} from '../../common/authorization/user-api';
import {UserCard} from '../../common/components/UserCard/UserCard';
import {Coordinate} from '../../common/authorization/user';

const MOBILE_PHONE_FIELD = 'mobilePhone';
const TELEGRAM_FIELD = 'telegram';

const LATTITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

const defaultCoordinate: Coordinate = {
  latitude: 56.8519,
  longitude: 60.6122,
};

export const OptionsScreen = () => {
  const user = useContext(UserContext);
  const changeUser = useContext(ChangeUserContext);

  const [coordinate, setCoordinate] = useState<Coordinate>(
    user?.coordinate ?? defaultCoordinate,
  );

  const {register, handleSubmit, setValue} = useForm();

  const onSubmit = useCallback(async (formData) => {
    console.log(formData);
    if (
      user.telegram !== formData.telegram ||
      user.mobilePhone !== formData.mobilePhone ||
      user.coordinate !== coordinate
    ) {
      await updateUserAsync(user.id, {
        mobilePhone: formData.mobilePhone,
        telegram: formData.telegram,
        coordinate: coordinate,
      });
      console.log(`user ${user.id} changed`);
      if (changeUser) {
        changeUser({
          ...user,
          telegram: formData.telegram,
          mobilePhone: formData.mobilePhone,
          coordinate: coordinate,
        });
      }
    }
  }, []);

  const onChangeField = useCallback(
    (name) => (text: string) => {
      setValue(name, text);
    },
    [],
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
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.view}>
          <UserCard user={user} />
          <View style={styles.form}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={{...styles.input, ...styles.emailInput}}
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
              placeholder="Телефон"
              maxLength={11}
              onChangeText={onChangeField(MOBILE_PHONE_FIELD)}
            />
            <Text style={styles.fieldLabel}>Telegram</Text>
            <TextInput
              style={styles.input}
              defaultValue={user.telegram}
              placeholder="Telegram"
              onChangeText={onChangeField(TELEGRAM_FIELD)}
            />
            <Text style={styles.fieldLabel}>Адрес</Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
                latitudeDelta: LATTITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}>
              <Marker
                draggable
                coordinate={coordinate}
                onDragEnd={(e) => setCoordinate(e.nativeEvent.coordinate)}
              />
            </MapView>
          </View>
          <View style={styles.button}>
            <Button title="Сохранить" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
