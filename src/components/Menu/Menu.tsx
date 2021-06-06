import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Menu as PaperMenu } from 'react-native-paper';

import KebabMenuIcon from '../icons/Cards/KebabMenuIcon';
import styles from './Menu.styles';

interface MenuProps {
    items: MenuItem[];
    visible: boolean;
    onPress: () => void;
    onDismiss: () => void;
}

export interface MenuItem {
    name: string;
    action: () => void;
}

const Menu = ({ items, visible, onPress, onDismiss }: MenuProps) => (
    <PaperMenu
        visible={visible}
        onDismiss={onDismiss}
        anchor={
            <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                    onPress();
                }}>
                <KebabMenuIcon />
            </TouchableOpacity>
        }>
        {items.map((item) => (
            <PaperMenu.Item
                key={item.name}
                onPress={() => {
                    item.action();
                    onDismiss();
                }}
                title={item.name}
            />
        ))}
    </PaperMenu>
);

export default Menu;
