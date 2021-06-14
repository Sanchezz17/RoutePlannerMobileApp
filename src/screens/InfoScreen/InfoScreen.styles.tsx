import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionDescription: {
        marginTop: 8,
        marginBottom: 10,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '400',
        color: Colors.dark,
    },
});