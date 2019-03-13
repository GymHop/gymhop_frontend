import { StyleSheet, Dimensions, Platform } from 'react-native'
import Layout  from '../../constants/Layout'

export const styles = StyleSheet.create({
  gymTileContainer: {
      width: Layout.window.width,
      height: (Layout.window.height) * 2 / 12,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "flex-start",
      alignItems: "center",
      maxWidth: Layout.window.width,
      padding: 8,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'rgba(0, 0, 0, .3)',

      // paddingHorizontal: 10
  },
    gymPhotoContainer: {
      width: "23%",
      padding: 3,
      marginRight: 8,

    },
      gymLeadPhoto: {
        width: 85,
        height: 85,
        borderRadius: 85 / 2,
        overflow: "hidden",
      },
    textContainer: {
      width: (Layout.window.width - 16) * 3 / 5,
      display: "flex",
      flexDirection: "column",
      paddingLeft: 6
    },
      gymTileTitle: {
        fontSize: 16,
      },
      gymTileText: {
        fontSize: 12,
      },
     extraDetailsContainer: {
       display: "flex",
       justifyContent: "center",
       width: (Layout.window.width - 20) * 15  / 100,

     }
});
