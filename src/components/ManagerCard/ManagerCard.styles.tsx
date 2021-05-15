import { StyleSheet } from 'react-native';
import { PaletteStorage } from '../palette/PaletteStorage';

const palette = PaletteStorage.getPalette();

export default StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: palette.Background,
        marginTop: 1.5,
    },
    cardInfo: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    kebabIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 36,
        height: 36,
        marginTop: 5,
    },
    expandCardIcon: {
        display: 'flex',
        alignSelf: 'center',
        minWidth: 80,
    },
    picture: {
        position: 'absolute',
        width: 62,
        height: 62,
        borderRadius: 50,
        zIndex: 2,
    },
    placeholder: {
        position: 'absolute',
        zIndex: 1,
    },
    imageContainer: {
        display: 'flex',
        width: 62,
        height: 62,
        borderRadius: 50,
        marginTop: 15,
        marginRight: 20,
    },
    info: {
        display: 'flex',
        justifyContent: 'center',
    },
    name: {
        minWidth: '55%',
        fontSize: 18,
    },
    position: {
        fontSize: 15,
        color: palette.SystemUI,
    },
    contacts: {
        marginLeft: 20,
    },
});
