import { StyleSheet } from 'react-native';
import Layout from '../constants/Layout';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#000000',
    height: '100%',
  },
  headLogo: {
    marginTop: '6%',
    backgroundColor: '#000000',
    width: Layout.window.height / 7,
    height: Layout.window.height / 7
  },
  inputContainer: {
    width: Layout.window.width,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
    registerInput: {
      height: 40,
      backgroundColor: '#ffffff',
      borderColor: 'black',
      borderWidth: 2,
      marginBottom: '3%',
      color: '#000000',
      width: '75%',
      borderRadius: 20,
      textAlign: 'center'
  },
registerButton: {
  height: 40,
  backgroundColor: '#8f8f8f',
  width: '75%',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
},
registerText: {
  fontSize: 20,
  color: '#000000',
},
loginButton: {
  backgroundColor: '#000000',
},
loginText: {
  marginTop: '5%',
  fontSize: 14,
  color: '#8f8f8f',
},
whiteText: {
  color: 'white'
}
})
