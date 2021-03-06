import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Header} from 'react-native/Libraries/NewAppScreen';
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
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Header />
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionDescription}>Hello, {user}!</Text>
            <Button
              title="Go to Details"
              onPress={() =>
                navigation.navigate('Options', {userName: user.name})
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
