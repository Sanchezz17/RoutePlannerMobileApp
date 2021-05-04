import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { RootDrawerParamList } from '../App/App';
import styles from './HomeScreen.styles';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentUser } from '../../redux/users/selectors';

type Props = DrawerScreenProps<RootDrawerParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
    const currentUser = useAppSelector(selectCurrentUser);

    return (
        <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionDescription}>
                        Привет, {currentUser.name}!
                    </Text>
                    <Button
                        title="Настройки"
                        onPress={() => navigation.navigate('Options')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
