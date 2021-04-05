import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {
  SignOutContext,
  UserContext,
} from '../../common/components/AuthorizeRoute';
import {useForm} from 'react-hook-form';
import styles from './OptionsScreen.styles';

type Props = StackScreenProps<RootStackParamList, 'Options'>;

export const OptionsScreen = () => {
  const user = useContext(UserContext);
  const signOut = useContext(SignOutContext);

  const {register, handleSubmit, setValue} = useForm();

  const onSubmit = useCallback((formData) => {
    console.log(formData);
  }, []);

  const onChangeField = useCallback(
    (name) => (text: string) => {
      setValue(name, text);
    },
    [],
  );

  useEffect(() => {
    register('email');
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
          <Text style={styles.userName}>{user.name}</Text>
          <Image style={styles.picture} source={{uri: user.picture}} />
          <View style={styles.form}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={{...styles.input, ...styles.emailInput}}
              value={user.email}
              editable={false}
              autoCompleteType="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              placeholder="Email"
              onChangeText={onChangeField('email')}
            />
            <Text style={styles.fieldLabel}>Телефон</Text>
            <TextInput
              style={styles.input}
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
              placeholder="Telegram"
              onChangeText={onChangeField('telegram')}
            />
          </View>
          <View style={styles.button}>
            <Button title="Сохранить" onPress={handleSubmit(onSubmit)} />
          </View>
          <View style={styles.button}>
            <Button
              color="red"
              title="Выйти"
              onPress={async () => {
                if (signOut) {
                  await signOut();
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
