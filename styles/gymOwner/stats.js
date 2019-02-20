import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';


export const styles = StyleSheet.create({
  loadingScreen: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
    loadingTextTitle: {
      fontSize:  28
    },
    loadingTextSubtitle: {
      fontSize: 20
    },
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
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
      height: "100%",
      paddingHorizontal: 10,
      width: Dimensions.get("window") - 20
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
