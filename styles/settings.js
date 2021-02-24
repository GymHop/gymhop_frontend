import { StyleSheet, Platform, } from 'react-native';
import Colors from '../constants/Colors'
import Layout from '../constants/Layout';

export const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: Colors.tabBar,
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
        backgroundColor: Colors.tabBar,
        width: '35%',
        height: Layout.noStatusBarHeight * .03,
      },
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.tabBar

  },
      profilePicContainer: {
        flex: .5,
        paddingTop: 30,
        paddingBottom: 5,
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
        promptTextContainer: {
          marginTop: 10
        },
          editPromptText: {
            color: 'black',
            fontWeight: 'bold'
          },
      profileDetailsContainer: {
        flex: .2,
        width: "100%",
        marginTop: '15%',
        paddingTop: 5,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderTopColor: "gray",
        borderTopWidth: StyleSheet.hairlineWidth,


      },
        dataLabel: {
          width: "100%",
          // paddingVertical: 5,
          marginLeft: 5,

        },
        dataLabelText: {
          fontWeight: 'bold',
          color: 'black'
        },
        dataFieldCont: {
          borderBottomColor: "gray",
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
          dataField: {
            width: "100%",
            paddingVertical: 8,
            marginLeft: 10
          },
      buttonBox: {
        flex: .4,
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom: '20%'
      },
      button: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 2,
        width: 175,
        height: 30,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
      },
      goldButton: {
        backgroundColor: '#4DD542',
        borderWidth: 2,
        borderColor: '#000',
        width: 175,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        
      }
})
