import React from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { useAppSelector } from '../../redux/hooks';
import { selectCurrentUser } from '../../redux/users/selectors';
import { DrawerRoutes } from '../../routing/main/routes';
import { DrawerNavigationProps } from '../../routing/main/types';
import styles from './InfoScreen.styles';

type InfoScreenProps = DrawerNavigationProps<DrawerRoutes.Info>;

export const InfoScreen = ({ navigation }: InfoScreenProps) => {
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
                        onPress={() =>
                            navigation.navigate(DrawerRoutes.Options, {
                                user: currentUser,
                            })
                        }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};