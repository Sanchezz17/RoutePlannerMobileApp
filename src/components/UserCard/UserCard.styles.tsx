import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        margin: 10,
    },
    picture: {
        width: 96,
        height: 96,
        borderRadius: 50,
        margin: 10,
    },
    info: {
        display: 'flex',
        justifyContent: 'center',
    },
    name: {
        maxWidth: '77%',
        fontSize: 18,
    },
    position: {
        fontSize: 15,
        color: 'grey',
    },
});
