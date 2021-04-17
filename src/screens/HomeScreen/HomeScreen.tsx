import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {UserContext} from '../../common/components/AuthorizeRoute/AuthorizeRoute';
import {RootDrawerParamList} from '../App/App';
import styles from './HomeScreen.styles';
import {DrawerScreenProps} from '@react-navigation/drawer';

type Props = DrawerScreenProps<RootDrawerParamList, 'Home'>;

export const HomeScreen = ({navigation}: Props) => {
  const user = useContext(UserContext);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionDescription}>Привет, {user.name}!</Text>
          <Button
            title="Настройки"
            onPress={() => navigation.navigate('Options')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
