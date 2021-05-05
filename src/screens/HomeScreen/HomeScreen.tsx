import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import React from 'react';
import styles from './HomeScreen.styles';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentUser } from '../../redux/users/selectors';
import { DrawerRoutes } from '../../routing/routes';
import { DrawerNavigationProps } from '../../routing/types';

type HomeScreenProps = DrawerNavigationProps<DrawerRoutes.Home>;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
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
