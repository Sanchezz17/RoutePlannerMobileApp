import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {getTokens} from '../../common/authorization/google/auth-state-manager';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {UserContext} from '../../common/components/AuthorizeRoute';

type Props = StackScreenProps<RootStackParamList, 'Options'>;

export const OptionsScreen = ({route}: Props) => {
  const user = useContext(UserContext);

  const [authState, setAuthState] = useState<{
    idToken: string;
    accessToken: string;
  } | null>(null);

  const fetchAuthState = async () => {
    const authStateToSet = await getTokens();
    setAuthState(authStateToSet);
  };

  useEffect(() => {
    fetchAuthState();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            height: '100%',
            margin: 15,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20}}>{route.params.userName}</Text>
          <Image
            style={{
              width: 96,
              height: 96,
              borderRadius: 50,
              margin: 10,
            }}
            source={{uri: user.picture}}
          />
          <Text style={{fontSize: 15}}>Email: {user.email}</Text>
          <Text>Токены: {JSON.stringify(authState)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
