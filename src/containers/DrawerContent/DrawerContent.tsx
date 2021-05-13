import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { UserCard } from '../../components/UserCard/UserCard';
import styles from './DrawerContent.styles';
import { signOut } from '../../common/authorization/google/authStateManager';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { removeUser } from '../../redux/users/reducer';
import { selectCurrentUser } from '../../redux/users/selectors';
import { PaletteStorage } from '../../components/palette/PaletteStorage';

const palette = PaletteStorage.getPalette();

export const DrawerContent = (props: DrawerContentComponentProps) => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);

    return (
        <View style={styles.drawerElements}>
            <DrawerContentScrollView style={styles.drawerElements} {...props}>
                <View style={styles.userCard}>
                    <UserCard user={currentUser} />
                </View>
                <DrawerItemList
                    activeBackgroundColor={palette.PrimaryTransparent}
                    activeTintColor={palette.Primary}
                    inactiveTintColor={palette.SystemUI}
                    {...props}
                />
            </DrawerContentScrollView>
            <View style={styles.exitButton}>
                <DrawerItem
                    labelStyle={styles.exitButtonLabel}
                    label="Выйти"
                    onPress={async () => {
                        if (signOut) {
                            await signOut();
                            dispatch(removeUser(currentUser.id));
                        }
                    }}
                />
            </View>
        </View>
    );
};
