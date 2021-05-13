import { StyleSheet } from 'react-native';
import { PaletteStorage } from '../../components/palette/PaletteStorage';

const palette = PaletteStorage.getPalette();
export default StyleSheet.create({
    drawerElements: {
        flex: 1,
    },
    userCard: {
        marginLeft: 12,
    },
    exitButton: {
        backgroundColor: palette.SystemUITransparent,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
    },
    exitButtonLabel: {
        alignSelf: 'center',
        marginLeft: 30,
    },
});
