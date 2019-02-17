import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors'

export const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "white"
  },
    profilePicContainer: {
      flex: .4,
      marginTop: 60,
      marginBottom: 30
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
        left: 127,
        borderRadius:100,
        backgroundColor: 'white'
      },
      editPromptText: {
        color: "gray",
      },
    profileDetailsContainer: {
      flex: .6,
      width: "100%",
      marginTop: 30
    },
      dataLabel: {
        backgroundColor: Colors.tintColor, //"#737A7F",
        width: "100%",
        paddingVertical: 5
      },
      dataField: {
        width: "100%",
        paddingVertical: 8
      },
})
