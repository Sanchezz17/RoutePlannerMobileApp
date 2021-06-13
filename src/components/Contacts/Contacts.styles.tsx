import { StyleSheet } from 'react-native';

import { PaletteStorage } from '../palette/PaletteStorage';

const palette = PaletteStorage.getPalette();

export default StyleSheet.create({
    contacts: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        marginTop: 1.5,
    },
    contact: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 7,
    },
    icon: {
        display: 'flex',
        marginRight: 5,
    },
    text: {
        color: palette.Secondary,
        lineHeight: 17,
    },
});
