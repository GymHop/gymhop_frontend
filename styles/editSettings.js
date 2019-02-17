import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
container: {
  flex: 1,
  paddingHorizontal: 10,
  marginTop: StatusBar.currentHeight,
},
  infoInputField: {
    marginVertical: 10,
  },
    infoInput: {
      height: 40,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
    },
  birthdayContainer: {borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden', marginBottom:22},
    birthdayInput: {
        height: 40,
        backgroundColor: '#ffffff',
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: '3%',
        color: '#000000',
        width: '100%',
        borderRadius: 20,
        textAlign: 'center'
    },
});
