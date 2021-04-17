import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect} from 'react';
import {
  ChangeUserContext,
  UserContext,
} from '../../common/components/AuthorizeRoute/AuthorizeRoute';
import {useForm} from 'react-hook-form';
import styles from './OptionsScreen.styles';
import {updateUserAsync} from '../../common/authorization/user-api';
import {UserCard} from '../../common/components/UserCard/UserCard';

export const OptionsScreen = () => {
  const user = useContext(UserContext);
  const changeUser = useContext(ChangeUserContext);

  const {register, handleSubmit, setValue} = useForm();

  const onSubmit = useCallback(async (formData) => {
    console.log(formData);
    if (
      user.telegram !== formData.telegram ||
      user.mobilePhone !== formData.mobilePhone
    ) {
      await updateUserAsync(user.id, {
        mobilePhone: formData.mobilePhone,
        telegram: formData.telegram,
      });
      console.log(`user ${user.id} changed`);
      if (changeUser) {
        changeUser({
          ...user,
          telegram: formData.telegram,
          mobilePhone: formData.mobilePhone,
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
    register('mobilePhone');
    register('telegram');
    if (user.mobilePhone) {
      setValue('mobilePhone', user.mobilePhone);
    }
    if (user.telegram) {
      setValue('telegram', user.telegram);
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
              onChangeText={onChangeField('mobilePhone')}
            />
            <Text style={styles.fieldLabel}>Telegram</Text>
            <TextInput
              style={styles.input}
              defaultValue={user.telegram}
              placeholder="Telegram"
              onChangeText={onChangeField('telegram')}
            />
          </View>
          <View style={styles.button}>
            <Button title="Сохранить" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
