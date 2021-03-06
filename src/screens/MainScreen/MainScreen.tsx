import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Header} from 'react-native/Libraries/NewAppScreen';
import React, {useContext} from 'react';
import {UserContext} from '../../common/authorization/identity-server/AuthorizeRoute';
import styles from './MainScreen.styles';

export const MainScreen = () => {
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
