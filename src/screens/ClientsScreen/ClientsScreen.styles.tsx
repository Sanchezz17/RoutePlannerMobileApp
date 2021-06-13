import { Dimensions, StyleSheet } from 'react-native';

import { PaletteStorage } from '../../components/palette/PaletteStorage';

const { height } = Dimensions.get('window');

const palette = PaletteStorage.getPalette();

export default StyleSheet.create({
    container: {
        flex: 1,
        height,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 15,
        bottom: 15,
        backgroundColor: palette.Secondary,
    },
});
