import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

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
});
