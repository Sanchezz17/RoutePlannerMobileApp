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
    userName: {
        fontSize: 20,
    },
    form: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    input: {
        flex: 1,
        marginVertical: 10,
    },
    activeInput: {
        backgroundColor: palette.Background,
    },
    inactiveInput: {
        backgroundColor: palette.SystemUIStroke,
    },
    fab: {
        width: '40%',
        height: 40,
        marginVertical: 20,
        alignSelf: 'flex-end',
        backgroundColor: palette.Secondary,
    },
    saveButtonLabel: {
        textAlignVertical: 'center',
    },
    map: {
        height: 350,
        width: '100%',
    },
    divider: {
        width: '100%',
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: palette.SystemUIStroke,
        marginBottom: 10,
    },
});
