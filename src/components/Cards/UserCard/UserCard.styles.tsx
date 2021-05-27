import { StyleSheet } from 'react-native';

import { PaletteStorage } from '../../palette/PaletteStorage';

const palette = PaletteStorage.getPalette();

export default StyleSheet.create({
    card: {
        minHeight: 120,
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: 120,
        flexDirection: 'row',
    },
    picture: {
        position: 'absolute',
        width: 84,
        height: 84,
        borderRadius: 50,
        zIndex: 2,
    },
    placeholder: {
        position: 'absolute',
        zIndex: 1,
    },
    imageContainer: {
        display: 'flex',
        width: 84,
        height: 84,
        borderRadius: 50,
        marginRight: 20,
        alignSelf: 'center',
    },
    info: {
        display: 'flex',
        justifyContent: 'center',
        margin: 15,
    },
    nameContainer: {
        flexGrow: 0,
        minHeight: 20,
        width: 150,
        maxHeight: 160,
    },
    name: {
        minHeight: 20,
        fontSize: 18,
        lineHeight: 20,
    },
    position: {
        marginTop: 2,
        fontSize: 13,
        color: palette.SystemUISecondary,
    },
});
