import { StyleSheet } from 'react-native';

import { PaletteStorage } from '../../palette/PaletteStorage';

const palette = PaletteStorage.getPalette();

export default StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: palette.Background,
        marginTop: 1.5,
    },
    cardInfo: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    kebabIconView: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 36,
        height: 36,
        marginTop: 5,
        zIndex: 2,
    },
    menu: {
        width: 200,
        zIndex: 4,
        elevation: 5,
    },
    expandCardIcon: {
        display: 'flex',
        alignSelf: 'center',
    },
    expandCardTouchableContainer: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    divider: {
        borderWidth: 0.5,
        borderColor: palette.SystemUIStroke,
        width: 180,
        marginTop: 10,
        marginLeft: 20,
    },
    picture: {
        position: 'absolute',
        width: 62,
        height: 62,
        borderRadius: 50,
        zIndex: 2,
    },
    placeholder: {
        position: 'absolute',
        zIndex: 1,
    },
    imageContainer: {
        display: 'flex',
        width: 62,
        height: 62,
        borderRadius: 50,
        marginTop: 15,
        marginRight: 20,
        marginLeft: 30,
    },
    info: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginLeft: 20,
        maxWidth: '80%',
    },
    infoShifted: {
        marginLeft: 40,
    },
    contactsShifted: {
        marginLeft: 20,
    },
    children: {
        width: 30,
        position: 'absolute',
        height: '100%',
    },
    name: {
        marginTop: 0,
        width: 210,
        fontSize: 18,
    },
    nameContainer: {
        maxHeight: 45,
        marginTop: 10,
    },
    additionalInfosContainer: {
        marginBottom: 10,
    },
    additionalInfo: {
        fontSize: 15,
        color: palette.SystemUI,
    },
    contactsContainer: {},
    contacts: {
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        width: 200,
    },
});
