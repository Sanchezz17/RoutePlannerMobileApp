import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    drawerContent: {
        height: '100%',
        margin: 15,
        alignItems: 'center',
        justifyContent: 'flex-end',
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
    },
    fieldLabel: {
        fontSize: 17,
        fontWeight: 'bold',
        marginVertical: 5,
        textAlign: 'left',
    },
    input: {
        backgroundColor: '#FFFFFF',
        height: 44,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        flex: 1,
        marginVertical: 10,
        borderColor: '#000000',
        borderWidth: 2,
    },
    emailInput: {
        color: 'black',
    },
    saveButton: {
        width: '40%',
        borderRadius: 10,
        marginVertical: 20,
    },
    map: {
        height: 350,
        width: '100%',
    },
});
