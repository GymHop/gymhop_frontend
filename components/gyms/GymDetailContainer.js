import React, { Component } from 'react';

import { View, Text, StyleSheet, Image } from 'react-native';
import Layout from '../../constants/Layout';

class GymDetailContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    // images
    // title
    // hours
    // description
    // activity

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
      <View style={styles.container}>
        <View style={styles.gymPhotoContainer}>
          <Image
          source={{uri: gym.lead_photo}}
          style={styles.gymLeadPhoto} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.gymTileText, styles.gymTileTitle]}>{this.props.gym.name} &mdash; {dollarSigns}</Text>
          <Text style={styles.gymTileText}>{this.props.gym.location['address_1']}, {this.props.gym.location['city']}</Text>
        </View>
        <Text>hours</Text>
        <Text>{this.props.gym.description}</Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: Layout.window.height * .9 - 49
  },
  gymPhotoContainer: {},
  gymLeadPhoto: {
    height: 200,
    width: Layout.window.width
  },
  textContainer: {
    width: (Layout.window.width - 16) * 3 / 5,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 6
  },
    gymTileTitle: {
      fontSize: 16,
    },
    gymTileText: {
      fontSize: 12,
    },

})

export default GymDetailContainer
