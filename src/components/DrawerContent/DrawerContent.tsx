import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { UserCard } from '../UserCard/UserCard';
import styles from './DrawerContent.styles';
import { signOut } from '../../common/authorization/google/authStateManager';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { removeUser } from '../../redux/users/reducer';
import { selectCurrentUser } from '../../redux/users/selectors';

export const DrawerContent = (props: DrawerContentComponentProps) => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);

    return (
        <DrawerContentScrollView {...props} style={styles.view}>
            <View style={styles.userCard}>
                <UserCard user={currentUser} />
            </View>
            <DrawerItemList {...props} />
            <View>
                <DrawerItem
                    label="Выйти"
                    onPress={async () => {
                        if (signOut) {
                            await signOut();
                            dispatch(removeUser(currentUser.id));
                        }
                    }}
                />
            </View>
        </DrawerContentScrollView>
    );
};
