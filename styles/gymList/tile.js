import { StyleSheet, Dimensions } from 'react-native'

export const styles = StyleSheet.create({
  gymTileContainer: {
      width: Dimensions.get('window').width,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center"
      // paddingHorizontal: 10
  },
    gymPhotoContainer: {
      width: "40%"
    },
      gymLeadPhoto: {
        height: 15,
        width: 24
      },
    textContainer: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around"
    },
      gymTileText: {
        fontSize: 10,

      },
});
