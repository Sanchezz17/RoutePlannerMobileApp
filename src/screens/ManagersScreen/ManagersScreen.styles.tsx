import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        height,
    },
});
