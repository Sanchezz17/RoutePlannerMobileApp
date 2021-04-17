import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  view: {
    height: '100%',
    margin: 15,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: '100%',
    fontSize: 17,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  emailInput: {
    borderWidth: 0,
    color: 'black',
  },
  button: {
    width: '40%',
    borderRadius: 10,
    marginVertical: 10,
  },
  map: {
    height: 350,
    width: '100%',
  },
});
