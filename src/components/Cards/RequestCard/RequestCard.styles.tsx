import { StyleSheet } from 'react-native';

import { PaletteStorage } from '../../palette/PaletteStorage';

const palette = PaletteStorage.getPalette();
export default StyleSheet.create({
    cardInfo: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        marginTop: 1.5,
        backgroundColor: palette.Background,
    },
    picture: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderRadius: 50,
    },
    placeholder: {
        position: 'absolute',
        width: 48,
        height: 48,
    },
    imageContainer: {
        width: 48,
        height: 48,
        alignSelf: 'center',
    },
    info: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 20,
        flexGrow: 1,
    },
    name: {
        maxWidth: '67%',
        fontSize: 18,
    },
    email: {
        fontSize: 15,
        color: palette.SystemUISecondary,
    },
    icon: {
        alignSelf: 'center',
        margin: 10,
    },
});
