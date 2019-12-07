import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image, StyleSheet, Text, Platform,
  View, NavigatorIOS, TouchableWithoutFeedback
} from 'react-native';
import { withNavigation } from 'react-navigation'

import Colors from "../../constants/Colors";

import { styles } from '../../styles/gymList/tile'
import QRScreen from "../../screens/QRScreen";
import { selectGym } from '../../actions/gymActions';


class GymTile extends Component {
  constructor(props) {
      super(props);
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

    return (
      <TouchableWithoutFeedback onPress={() => {
        this.props.selectGym(gym);
        this.props.navigation.push("GymDetail");
      }}>
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
            <Text style={styles.milesFigure}>{Math.round(gym.distance*10)/10}</Text>
            <Text style={styles.milesText}>miles</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return {
    selectGym: (gym) => dispatch(selectGym(gym))
  }
}

export default connect(null, mapDispatchToProps)(withNavigation(GymTile))
