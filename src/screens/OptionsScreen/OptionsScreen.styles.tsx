import { StyleSheet } from 'react-native';
import { PaletteStorage } from '../../components/palette/PaletteStorage';
import { DefaultTheme } from 'react-native-paper';

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
        paddingHorizontal: 15,
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
    fieldLabel: {
        fontSize: 17,
        fontWeight: 'bold',
        marginVertical: 5,
        textAlign: 'left',
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
    saveButton: {
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
        width: '90%',
        alignSelf: 'center',
        borderWidth: 0.5,
        borderColor: palette.SystemUIStroke,
        marginBottom: 10,
    },
});
