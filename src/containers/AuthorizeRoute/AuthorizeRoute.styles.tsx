import { StyleSheet } from 'react-native';

import { PaletteStorage } from '../../components/palette/PaletteStorage';

const palette = PaletteStorage.getPalette();
export default StyleSheet.create({
    view: {
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    signInButton: {
        marginTop: 70,
        height: '10%',
    },
    logo: {
        marginTop: 100,
    },
    title: {
        fontSize: 26,
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        marginTop: 15,
        width: '85%',
        textAlign: 'center',
        alignSelf: 'center',
    },
});
