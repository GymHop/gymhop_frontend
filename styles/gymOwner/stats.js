import { StyleSheet, Platform, StatusBar } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    monthContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      flex: .14,
      marginTop: StatusBar.currentHeight,

    },
      monthText: {
        fontSize: 28,
        fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto'
      },
    checkinGraph: {
      flex: .38,
    },
    tileRow: {
      flex: .25,
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 4
    },
      tileElement: {
        width: "50%"
      }
})
