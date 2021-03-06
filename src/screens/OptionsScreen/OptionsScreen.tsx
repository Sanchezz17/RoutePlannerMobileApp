import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Header} from 'react-native/Libraries/NewAppScreen';
import React, {useEffect, useState} from 'react';
import {AuthorizeResult} from 'react-native-app-auth';
import {getAuthStateAsync} from '../../common/authorization/identity-server/auth-state-manager';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type Props = StackScreenProps<RootStackParamList, 'Options'>;

export const OptionsScreen = ({route}: Props) => {
  const [authState, setAuthState] = useState<AuthorizeResult | null>(null);

  const fetchAuthState = async () => {
    const authStateToSet = await getAuthStateAsync();
    setAuthState(authStateToSet);
  };

  useEffect(() => {
    fetchAuthState();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View>
          <Text>User: {route.params.userName}</Text>
          <Text>Options: {authState}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
