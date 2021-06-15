import { StyleSheet } from 'react-native';

import { PaletteStorage } from '../../components/palette/PaletteStorage';

const palette = PaletteStorage.getPalette();
export default StyleSheet.create({
    background: {
        backgroundColor: palette.Background,
    },
    scrollView: {
        height: '100%',
        zIndex: 2,
    },
    logoIcon: {
        position: 'absolute',
        bottom: 40,
        left: -100,
        zIndex: 1,
    },
    sectionContainer: {
        padding: 20,
        marginBottom: 20,
        paddingBottom: 100,
    },
    headerLine: {
        marginTop: 20,
        flexDirection: 'row',
    },
    header: {
        fontSize: 20,
    },
    headerRole: {
        fontWeight: '700',
        fontSize: 21,
    },
    paragraph: {
        marginTop: 20,
        fontSize: 16,
    },
});
