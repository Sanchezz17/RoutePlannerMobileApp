import {
  SignOutContext,
  UserContext,
} from '../../../common/components/AuthorizeRoute/AuthorizeRoute';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {View} from 'react-native';
import {UserCard} from '../../../common/components/UserCard/UserCard';
import styles from './DrawerContent.styles';

export const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <SignOutContext.Consumer>
          {(signOut) => (
            <DrawerContentScrollView {...props} style={{flexWrap: 'wrap'}}>
              <View style={styles.userCard}>
                <UserCard user={user} />
              </View>
              <DrawerItemList {...props} />
              <View>
                <DrawerItem
                  label="Выйти"
                  onPress={async () => {
                    if (signOut) {
                      await signOut();
                    }
                  }}
                />
              </View>
            </DrawerContentScrollView>
          )}
        </SignOutContext.Consumer>
      )}
    </UserContext.Consumer>
  );
};
