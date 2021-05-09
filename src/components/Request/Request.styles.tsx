import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 2,
    },
    picture: {
        width: 48,
        height: 48,
        borderRadius: 50,
        alignSelf: 'center',
    },
    info: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 20,
        flexGrow: 1,
    },
    name: {
        maxWidth: '67%',
        fontSize: 18,
    },
    email: {
        fontSize: 15,
        color: 'grey',
    },
    icon: {
        alignSelf: 'center',
        margin: 10,
    },
});
