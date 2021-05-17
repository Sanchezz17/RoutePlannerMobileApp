import { StyleSheet } from 'react-native';
import { PaletteStorage } from '../palette/PaletteStorage';
import { DefaultTheme } from 'react-native-paper';

const palette = PaletteStorage.getPalette();

export const theme = {
    ...DefaultTheme,
    roundness: 10,
};

export default StyleSheet.create({
    input: {
        flex: 1,
        marginVertical: 10,
    },
    activeInput: {
        backgroundColor: palette.Background,
    },
    inactiveInput: {
        backgroundColor: palette.SystemUIStroke,
    },
});
