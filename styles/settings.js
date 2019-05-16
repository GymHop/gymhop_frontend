import { StyleSheet, Platform, } from 'react-native';
import Colors from '../constants/Colors'
import Layout from '../constants/Layout';

export const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: 'black',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        zIndex: 999,
        height: Layout.noStatusBarHeight * .04,

      },
      android: {
        elevation: 30,
        paddingVertical: 6,

      },
    })},
      brandLogo: {
        backgroundColor: '#000000',
        width: '35%',
        height: Layout.noStatusBarHeight * .03,
      },
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.tintColor
  },
      profilePicContainer: {
        flex: .4,
        marginTop: 30,
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
