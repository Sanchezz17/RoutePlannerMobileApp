import { StyleSheet } from 'react-native';

import { PaletteStorage } from '../palette/PaletteStorage';

const palette = PaletteStorage.getPalette();

export default StyleSheet.create({
    view: {
        display: 'flex',
        width: '96%',
        alignSelf: 'center',
        marginBottom: 20,
    },
    touchableContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 70,
        justifyContent: 'space-between',
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '100%',
        marginLeft: 12,
    },
    title: {
        fontSize: 16,
        color: palette.SystemUISecondary,
    },
    subtitle: { fontSize: 20 },
    iconContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '20%',
    },
    icon: { alignSelf: 'center' },
    picker: { backgroundColor: palette.Secondary },
});
