import { StyleSheet } from 'react-native';

import { PaletteStorage } from '../palette/PaletteStorage';

const palette = PaletteStorage.getPalette();

export default StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'row',
        width: '96%',
        alignSelf: 'center',
        marginBottom: 20,
    },
    input: {
        alignSelf: 'flex-start',
        height: 70,
        marginTop: 0,
    },
    iconContainer: {
        justifyContent: 'center',
        borderWidth: 1,
        width: '20%',
        height: '100%',
    },
    icon: {
        alignSelf: 'center',
    },
});
