import { StyleSheet, Platform } from 'react-native';
import Layout from '../constants/Layout';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#ffd1dc',
    height: '100%'
  },
  headLogo: {
    marginTop: 0,
    backgroundColor: '#ffd1dc',
    width: Layout.window.width / 3,
    height: Layout.window.width / 2,
  },
  textStyle: {
    marginTop: 25,
    marginBottom: Platform.OS === "ios" ? 40 : 0,
  },
    photoText: {
      color: "white",
    },
  photoUploadContainer: {
    flex: 1,
    padding: 20,
    marginBottom: Platform.OS === "ios" ? 40 : 15,
  },
  registerInput: {
    height: 40,
    backgroundColor: '#ffffff',
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: '3%',
    color: '#000000',
    width: Layout.window.width * .79,
    borderRadius: 20,
    textAlign: 'center'
},
registerBirthdayPicker: {
  height: Platform.OS === "ios" ? 200 : 40,
  ...Platform.select({
      android: {
        marginBottom: 10,
      },
    }),
  color: "#ffffff",
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
},
registerButton: {
  height: 40,
  backgroundColor: '#000',
  width: '75%',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  marginBottom: 4
},
registerText: {
  fontSize: 20,
  color: '#fff',
},
loginButton: {
  backgroundColor: '#ffd1dc',
  marginTop: 15
},
loginText: {
  marginTop: 2,
  fontSize: 14,
  color: '#8f8f8f',
},
whiteText: {
  color: 'white'
},
})
