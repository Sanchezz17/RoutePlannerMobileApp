import { StyleSheet } from 'react-native';

import { PaletteStorage } from '../../components/palette/PaletteStorage';

const palette = PaletteStorage.getPalette();
export default StyleSheet.create({
    drawerElements: {
        flex: 1,
    },
    userCard: {
        backgroundColor: palette.Background,
        borderBottomWidth: 0.5,
        borderColor: palette.SystemUIStroke,
    },
    exitButton: {
        backgroundColor: palette.SystemUIStroke,
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
