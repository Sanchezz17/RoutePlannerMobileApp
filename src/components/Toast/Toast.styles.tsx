import { StyleSheet } from 'react-native';

import { PaletteStorage } from '../palette/PaletteStorage';

const palette = PaletteStorage.getPalette();

export default StyleSheet.create({
    toast: {
        backgroundColor: palette.PrimaryFaint,
        borderLeftWidth: 0,
        borderRadius: 50,
        elevation: 20,
    },
    contentContainerStyle: {
        paddingHorizontal: 15,
    },
    text1: {
        fontSize: 15,
        fontWeight: 'normal',
    },
    text2: {
        fontSize: 15,
        color: palette.Primary,
    },
    leadingIcon: {
        borderWidth: 1,
        marginLeft: 10,
    },
    trailingIconInvisible: {
        display: 'none',
    },
});
