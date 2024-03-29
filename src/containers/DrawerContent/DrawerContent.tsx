import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';

import { signOut } from '../../common/authorization/google/authStateManager';
import { UserCard } from '../../components/Cards/UserCard/UserCard';
import { PaletteStorage } from '../../components/palette/PaletteStorage';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/users/reducer';
import { selectCurrentUser } from '../../redux/users/selectors';
import styles from './DrawerContent.styles';

const palette = PaletteStorage.getPalette();

export const DrawerContent = (props: DrawerContentComponentProps) => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);

    return (
        <View style={styles.drawerElements}>
            <DrawerContentScrollView
                nestedScrollEnabled={true}
                style={styles.drawerElements}
                {...props}>
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
                        await signOut();
                        dispatch(logout());
                    }}
                />
            </View>
        </View>
    );
};
