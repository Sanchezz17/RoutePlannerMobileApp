import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    cardInfo: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        margin: 10,
    },
    picture: {
        position: 'absolute',
        width: 84,
        height: 84,
        borderRadius: 50,
        zIndex: 2,
    },
    placeholder: {
        position: 'absolute',
        zIndex: 1,
    },
    imageContainer: {
        display: 'flex',
        width: 84,
        height: 84,
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
