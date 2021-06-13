import { StyleSheet } from 'react-native';

import { PaletteStorage } from '../../palette/PaletteStorage';

const palette = PaletteStorage.getPalette();
export default StyleSheet.create({
    title: {
        fontSize: 16,
        lineHeight: 16,
        marginLeft: 30,
        marginTop: 13,
    },
    touchable: {
        width: '100%',
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: palette.Background,
        marginTop: 2,
        height: 100,
        maxHeight: 100,
    },
    infos: {
        flexDirection: 'row',
        marginLeft: 30,
    },
    info: {
        flexDirection: 'column',
        width: '50%',
    },
    infoHeader: {
        color: palette.SystemUISecondary,
    },
    time: {
        fontSize: 18,
    },
    iconVisible: {
        position: 'absolute',
        top: 10,
        left: 5,
    },
    iconInvisible: {
        display: 'none',
    },
    notFilledText: {
        fontSize: 18,
        marginTop: 10,
    },
});
