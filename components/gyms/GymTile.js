import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import {
  Image, StyleSheet, Text,
  TouchableOpacity, View, NavigatorIOS, Header
} from 'react-native';

import { styles } from '../../styles/gymList/tile'
import QRScreen from "../../screens/QRScreen";


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
    let {gym} = this.props;
    return (
      <View styles={styles.gymTileContainer}>
        <View style={styles.gymPhotoContainer}>
          <Image
          source={{uri: gym.lead_photo}}
          style={styles.gymLeadPhoto}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.gymTileText}>{this.props.gym.name}</Text>
          <Text style={styles.gymTileText}>Location: {this.props.gym.location['address_1']}, {this.props.gym.location['city']}</Text>
          <Text style={styles.gymTileText}>{dollarSigns}</Text>
        </View>
      </View>
    )
  }
};
