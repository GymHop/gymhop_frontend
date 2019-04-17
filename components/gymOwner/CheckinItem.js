import React from 'react';

import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { dateFormatter } from '../../utils/datetime';
import Layout from '../../constants//Layout';

const CheckinItem = ({checkin}) => {
  shortenName = (name) => {
    if (name.length > 15) {
        return name.substring(0,15).trim() + "...";
    }
    return name

  }
  console.log(checkin.user.picture_url);
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{uri: checkin.user.picture_url}} alt={checkin.user.firstName} />
      </View>
      <View style={styles.checkinDetails}>
        <View style={styles.identifierContainer}>
          <Text>{checkin.user.first_name} {checkin.user.last_name}</Text>
          <Text>{dateFormatter(checkin.when, 'date-time')}</Text>
        </View>
        <View style={styles.gymNameContainer}>
          <Text style={styles.gymName}>{shortenName(checkin.gym.name)}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "35%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 6
  },
    imgContainer: {
      width: (Layout.window.width - (2*14))/5,
      marginHorizontal: 7
    },
      img: {
        aspectRatio: 1,
        flex: 1,
        width: null,
        height: (Layout.window.width - (2*14))/5,
        borderRadius: ((Layout.window.width - (2*14))/5) / 2,
        overflow: "hidden",
      },
    checkinDetails: {
      borderBottomColor: "gray",
      borderBottomWidth: StyleSheet.hairlineWidth,
      flexDirection: "row",
      height: "100%"
    },
      identifierContainer: {
        alignSelf: "stretch",
        display: "flex",
        width: (Dimensions.get("window").width - (2*14)) * 7 /15,
        flexDirection: "column",
        justifyContent: "space-around",
      },
      gymNameContainer: {
        alignSelf: "center",
        width: (Dimensions.get("window").width - (2*14))/3,
      },
        gymName: {
          textAlign: "right"
        }
})
export default CheckinItem
