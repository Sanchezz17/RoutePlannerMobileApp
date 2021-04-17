import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
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
    fontSize: 18,
  },
  position: {
    fontSize: 15,
    color: 'grey',
  },
});
