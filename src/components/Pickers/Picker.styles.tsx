import { StyleSheet } from 'react-native';

import { PaletteStorage } from '../palette/PaletteStorage';

const palette = PaletteStorage.getPalette();

export default StyleSheet.create({
    view: {
        display: 'flex',
        width: '92%',
        marginHorizontal: '4%',
        marginBottom: 20,
    },
    touchableContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 70,
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '80%',
        height: '100%',
    },
    title: {
        fontSize: 18,
    },
    subtitle: { fontSize: 16 },
    iconContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '20%',
    },
    icon: { alignSelf: 'center' },
    picker: { backgroundColor: palette.Secondary },
});
