import { StyleSheet } from 'react-native';

import { PaletteStorage } from '../../palette/PaletteStorage';

const palette = PaletteStorage.getPalette();
export default StyleSheet.create({
    indicatorContainer: {
        width: 20,
        height: '100%',
        alignSelf: 'center',
    },
    indicatorStripe: {
        height: '53%',
        width: 3,
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
    indicatorStripeActive: {
        backgroundColor: palette.Primary,
    },
    indicatorStripeVisited: {
        backgroundColor: palette.SystemUISecondary,
    },
    indicatorStripeWillVisit: {
        backgroundColor: palette.SecondaryTransparent,
    },

    indicatorCircleActive: {
        borderColor: palette.Primary,
        borderWidth: 1,
        width: 22,
        height: 22,
        lineHeight: 20,
        marginTop: -12,
        color: palette.Primary,
        backgroundColor: palette.PrimaryFaint,
    },
    indicatorCircleVisited: {
        borderColor: palette.SystemUI,
        color: palette.SystemUI,
        backgroundColor: palette.Background,
    },
    indicatorCircleWillVisit: {
        borderColor: palette.SecondaryTransparent,
        color: palette.Secondary,
        backgroundColor: palette.Background,
    },
});
