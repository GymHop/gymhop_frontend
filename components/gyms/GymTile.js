import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image, StyleSheet, Text,
  TouchableOpacity, View, NavigatorIOS, Header
} from 'react-native';

import QRScreen from "../../screens/QRScreen";

const styles = StyleSheet.create({
  gymTileContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      height: '80%',
  },
  gymTileButton: {
    backgroundColor: '#000000',
    width: 400,
    marginTop: 20,
    padding: 15,

  },
  gymTileText: {
    fontSize: 18,
    color: '#ffffff',
    padding: 5
    
  },
});

export default class GymTile extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let dollarSigns;
    switch (this.props.gym.price) {
      case 0:
        dollarSigns = ""
      case 1:
        dollarSigns = "$$"
      case 2:
        dollarSigns = "$$$$"
      default:
        dollarSigns = ""
    }


    return (
      <TouchableOpacity onPress={() => {
          console.log("pressed on gym");
          console.log(this.props);
          this.props.navigator.push("QR",{
            title: this.props.gym.name,
            passProps: {gym: this.props.gym}
          })
      }}>
        <View styles={styles.gymTileContainer}>
          <View style={styles.gymTileButton}>
            <Text style={styles.gymTileText}>{this.props.gym.name} </Text>
            <Text style={styles.gymTileText}>Location: {this.props.gym.location['address_1']}, {this.props.gym.location['city']}</Text>
            <Text style={styles.gymTileText}>{dollarSigns}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
};