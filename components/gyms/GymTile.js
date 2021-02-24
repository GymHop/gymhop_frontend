import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image, StyleSheet, Text, Platform,
  View, NavigatorIOS, TouchableWithoutFeedback
} from 'react-native';
import { withNavigation } from 'react-navigation'

import Colors from "../../constants/Colors";

import { styles } from '../../styles/gymList/tile'
import OpenOrClosedRightNow from './OpenOrClosedRightNow';
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
      case 2:
        dollarSigns = "Trial";
        break;
      case 4:
        dollarSigns = "Standard";
        break;
      case 8:
        dollarSigns = "Premium";
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
            <OpenOrClosedRightNow hours={gym.hours_enhanced} />
          </View>
          <View style={styles.extraDetailsContainer}>
            <Text style={styles.milesFigure}>{Math.round(gym.distance*10)/10}</Text>
            <Text style={styles.milesText}>miles</Text>
            <Text style={styles.premiumText}>{dollarSigns}</Text>
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
