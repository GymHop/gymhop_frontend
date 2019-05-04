import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors'
import Layout from '../constants/Layout';

export const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.tintColor
  },
      profilePicContainer: {
        flex: .4,
        marginTop: 60,
        marginBottom: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
        alignItems: "center",
        // borderBottomColor: "gray",
        // borderBottomWidth: StyleSheet.hairlineWidth,
      },
        profilePic: {
          borderRadius: 25,
          borderWidth: 2,
          borderColor: 'white',
        },
        profileIconContainer: {
          width: 32,
          position: 'relative',
          top: -26,
          left: Layout.window.height/6 - 72,
          borderRadius: 100,
          backgroundColor: 'white'
        },
        editPromptText: {
          color: "gray",
          marginTop: -15
        },
      profileDetailsContainer: {
        flex: .6,
        width: "100%",
        marginTop: 5,
        backgroundColor: "white",
        borderTopColor: "gray",
        borderTopWidth: StyleSheet.hairlineWidth,

      },
        dataLabel: {
          borderTopColor: "gray",
          borderTopWidth: StyleSheet.hairlineWidth,
          width: "100%",
          paddingVertical: 5,
          marginLeft: 5
        },
        dataField: {
          width: "100%",
          paddingVertical: 8,
          marginLeft: 10
        },
})
