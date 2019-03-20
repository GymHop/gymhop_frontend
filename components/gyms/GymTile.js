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
    let {gym} = this.props;

    let dollarSigns;
    switch (gym.price) {
      case 0:
        dollarSigns = "";
        break;
      case 1:
        dollarSigns = "Budget";
        break;
      case 2:
        dollarSigns = "Premium ";
        break;
      default:
        dollarSigns = ""
    }
    console.log("lead photo url");
    console.log(gym.lead_photo);

    return (
      <View style={styles.gymTileContainer}>
        <View style={styles.gymPhotoContainer}>
          <Image
          source={{uri: gym.lead_photo}}
          style={styles.gymLeadPhoto}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.gymTileText, styles.gymTileTitle]}>{this.props.gym.name}</Text>
          <Text style={styles.gymTileText}>{this.props.gym.location['address_1']}, {this.props.gym.location['city']}</Text>
        </View>
        <View style={styles.extraDetailsContainer}>
          <Text style={[styles.gymTileText, {fontWeight:"bold"}]}>{dollarSigns}</Text>
        </View>
      </View>
    )
  }
};
