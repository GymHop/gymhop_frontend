import { StyleSheet, StatusBar, Platform } from 'react-native';

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
  birthdayContainer: {borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    overflow: 'hidden',
    marginBottom:22},
    birthdayInput: {
        height: Platform.OS === "ios" ? 240 : 40,
        ...Platform.select({
            android: {
              marginBottom: 10,
            },
          }),

        width: '100%',

    },
});
