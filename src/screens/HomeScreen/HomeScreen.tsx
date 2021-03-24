import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {UserContext} from '../../common/components/AuthorizeRoute';
import styles from './HomeScreen.styles';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({navigation}: Props) => {
  const user = useContext(UserContext);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionDescription}>Hello, {user.email}!</Text>
          <Button
            title="Настройки"
            onPress={() =>
              navigation.navigate('Options', {userName: user.name})
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
