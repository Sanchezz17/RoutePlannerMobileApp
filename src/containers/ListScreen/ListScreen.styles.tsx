import { Dimensions, StyleSheet } from 'react-native';

import { PaletteStorage } from '../../components/palette/PaletteStorage';

const { height } = Dimensions.get('window');
const palette = PaletteStorage.getPalette();
export default StyleSheet.create({
    container: {
        flex: 1,
        height,
    },
    searchbar: {
        elevation: 0,
    },
    button: {
        display: 'flex',
        height: 56,
        width: 56,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
    },
    icon: {
        alignSelf: 'center',
    },
    iconContainer: {
        display: 'flex',
        marginHorizontal: 25,
        height: '100%',
        width: 60,
        justifyContent: 'center',
    },
    date: {
        alignSelf: 'center',
        fontSize: 18,
    },
    dateSelector: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
        backgroundColor: palette.Background,
        borderColor: palette.SystemUIStroke,
        borderTopWidth: 0.5,
        elevation: 5,
    },
});
