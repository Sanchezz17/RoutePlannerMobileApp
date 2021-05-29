import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

import { PaletteStorage } from '../../components/palette/PaletteStorage';

const palette = PaletteStorage.getPalette();

export const theme = {
    ...DefaultTheme,
    roundness: 10,
};

export default StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: palette.Background,
    },
    container: {
        paddingHorizontal: 20,
    },
    picture: {
        width: 96,
        height: 96,
        borderRadius: 50,
        margin: 10,
    },
    clientName: {
        fontSize: 20,
        margin: 20,
    },
    form: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    fab: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        backgroundColor: palette.Secondary,
    },
    divider: {
        width: '90%',
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: palette.SystemUITransparent,
        marginBottom: 30,
        marginHorizontal: '5%',
    },
    input: {
        display: 'flex',
        alignSelf: 'center',
        width: '96%',
    },
});
