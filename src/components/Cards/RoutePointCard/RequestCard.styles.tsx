import { StyleSheet } from 'react-native';

import { PaletteStorage } from '../../palette/PaletteStorage';

const palette = PaletteStorage.getPalette();
export default StyleSheet.create({
    indicatorContainer: {
        width: 20,
        height: '100%',
        borderWidth: 1,
        alignSelf: 'center',
    },
    indicatorStripe: {
        height: '53%',
        width: 5,
        borderWidth: 1,
        borderColor: 'blue',
        alignSelf: 'center',
        zIndex: 1,
    },
    stripeTop: {
        position: 'absolute',
        top: 0,
    },
    stripeBottom: {
        position: 'absolute',
        bottom: '-3%',
        backgroundColor: 'blue',
    },
    indicatorCircle: {
        position: 'absolute',
        top: '50%',
        marginTop: -10,
        borderWidth: 1,
        borderRadius: 50,
        height: 20,
        width: 20,
        textAlign: 'center',
        alignSelf: 'center',
        zIndex: 2,
        backgroundColor: palette.Background,
    },
    indicatorActive: {
        borderColor: palette.Primary,
        color: palette.Primary,
    },
    indicatorVisited: {
        borderColor: palette.SystemUI,
        color: palette.SystemUI,
    },
    indicatorWillVisit: {
        borderColor: palette.SystemUISecondary,
        color: palette.SystemUISecondary,
    },
});
