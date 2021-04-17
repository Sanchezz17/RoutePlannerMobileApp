import {SignOutContext} from '../../../common/components/AuthorizeRoute/AuthorizeRoute';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {View} from 'react-native';

export const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <SignOutContext.Consumer>
      {(signOut) => (
        <DrawerContentScrollView {...props}>
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
  );
};
