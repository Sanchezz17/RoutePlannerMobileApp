import { StyleSheet } from 'react-native';

import { PaletteStorage } from '../../palette/PaletteStorage';

const palette = PaletteStorage.getPalette();
export default StyleSheet.create({
    card: {
        backgroundColor: palette.Background,
        marginBottom: 2,
    },
});
