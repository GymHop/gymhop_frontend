import { StyleSheet, Platform } from 'react-native';
import Layout from '../constants/Layout';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#000000',
    height: '100%'
  },
  headLogo: {
    marginTop: 0,
    backgroundColor: '#000000',
    width: Layout.window.width / 3,
    height: Layout.window.width / 2,
  },
  textStyle: {
    marginTop: 25
  },
    photoText: {
      color: "white",
    },
  photoUploadContainer: {
    flex: 1,
    padding: 15,
    marginBottom: 15,
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
  backgroundColor: '#8f8f8f',
  width: '75%',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  marginBottom: 4
},
registerText: {
  fontSize: 20,
  color: '#000000',
},
loginButton: {
  backgroundColor: '#000000',
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
