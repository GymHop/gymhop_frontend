import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Layout.window.width,
    padding: 8
  },
    headingContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 12
    },
      detailContainer: {
        width: "35%",
        padding: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        height: 50, // make sure that the margin buttom of the entire section aligns with at least this number

      },
      tierContainer: {
        width: "35%",
        padding: 1,
        justifyContent: "center",

      },
        tierText: {
          fontSize: 14,
          textAlign: "center"
        },

    actionContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around"
    },
      actionButton: {
        width: "35%"
      }
});
