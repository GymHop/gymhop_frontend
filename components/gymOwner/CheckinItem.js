import React from 'react';

import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { dateFormatter } from '../../utils/datetime';

const CheckinItem = ({checkin}) => {
  shortenName = (name) => {
    if (name.length > 15) {
        return name.substring(0,15).trim() + "...";
    }
    return name

  }

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
      padding: 7,
      width: (Dimensions.get("window").width - (2*14))/5,
    },
      img: {
        aspectRatio: 1,
        borderRadius: 100,
        height: "100%",
        width: "92%",
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
