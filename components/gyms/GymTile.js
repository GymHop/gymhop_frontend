import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image, StyleSheet, Text, Platform, PanResponder,
  TouchableOpacity, View, NavigatorIOS, Header
} from 'react-native';
import { withNavigation } from 'react-navigation'

import Colors from "../../constants/Colors";

import { styles } from '../../styles/gymList/tile'
import QRScreen from "../../screens/QRScreen";


class GymTile extends Component {
  constructor(props) {
    super(props);
  //   this._panResponder = PanResponder.create({
  //     // Ask to be the responder
  //     onStartShouldSetPanResponder: (evt, gestureState) => this.allowSingleClicksThrough(evt, gestureState),
  //     onStartShouldSetPanResponderCapture: () => true,
  //     onMoveShouldSetPanResponder: (evt, gestureState) => this.allowSingleClicksThrough(evt, gestureState),
  //     onMoveShouldSetPanResponderCapture: (evt, gestureState) => this.allowSingleClicksThrough(evt, gestureState),
  //     onPanResponderMove: (e, gestureState) => {
  //       console.info('onPanResponderMove', gestureState.dx);
  //       // React to the movement!
  //     },
  //     onPanResponderRelease: (evt, gestureState) => {
  //       if (Math.abs(gestureState.dx) >= 80) {
  //         this.props.navigation.push("Schedule", {
  //           title: this.props.gym.name,
  //           passProps: {gym: this.props.gym}
  //         });
  //       }
  //     },


  //   });
    }

  // allowSingleClicksThrough = (evt, gestureState) => {
  //   let shouldMove = Math.abs(gestureState.dx) >= 5
  //   if (shouldMove) {console.log("should capture")} else {console.log("should not capture")}
  //   return shouldMove
  // }

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
      <View style={styles.gymTileContainer} /*{...this._panResponder.panHandlers}*/ >
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
          {/* <Text style={[styles.gymTileText, {fontWeight:"bold"}]}>{dollarSigns}</Text> */}
          <Image
          source={require('../../assets/images/arrow.png')}
          resizeMode='contain'
          style={styles.arrowPhoto}
          />
          <Text style={styles.text}>Classes</Text>
        </View>
      </View>
    )
  }
};

export default withNavigation(GymTile)
