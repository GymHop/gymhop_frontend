import React, { Component } from 'react';

import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import openMap from 'react-native-open-maps';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Feather';

class ActionBar extends Component {
  constructor(props) {
    super(props);
  }

  goToGym = () => {
    let mapsQuery = this.props.gym.name + " " +
                    this.props.gym.location["address_1"] + " " +
                    this.props.gym.location["city"] + " " +
                    this.props.gym.location["zip_code"]
    console.log("maps query", mapsQuery);
    openMap({
       // latitude: parseFloat(this.props.gym.latitude),
       // longitude: parseFloat(this.props.gym.longitude),
       travelType: "drive",
       end: mapsQuery,
       navigate_mode: "preview"
    })
  }

  render() {
    return (
      <View style={styles.actionContainer}>
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity
            onPress={this.goToGym}
            style={styles.lightGrayBtn}>
            <Icon name="map" size={18} color="#979999"/>
            <Text style={styles.lightGrayBtnText}>Directions</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionButtonContainer}>
            <TouchableOpacity
                onPress={() => {
                  Linking.openURL(this.props.gym.website_url)
                }}
                style={styles.lightGrayBtn}>
              <Icon name="link" size={18} color="#979999"/>
              <Text style={styles.lightGrayBtnText}>Website</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actionContainer: {
    marginTop: 12,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: "center"
  },
  actionButtonContainer: {
    marginRight: 30,
  },
    lightGrayBtn: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#97999988",
      paddingHorizontal: 10,
      paddingVertical: 7,
      backgroundColor: "white",
      borderWidth: 1
    },
      lightGrayBtnText: {
        fontSize: 16,
       color: "#979999",
       paddingLeft: 5
      },
})

export default ActionBar
