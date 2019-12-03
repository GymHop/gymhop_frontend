import React, { Component } from 'react';

import { View, Text, StyleSheet, Image } from 'react-native';
import Layout from '../../constants/Layout';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import EnhancedHours from './EnhancedHours';


class GymDetailContainer extends Component {
  constructor(props) {
    super(props);
  }

  formatDistance = (distance) => {
    return Math.round(distance*10)/10 +" Miles"
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

    console.log(gym);


    return (
      <View style={styles.container}>
        <View style={styles.gymPhotoContainer}>
          <Image
          source={{uri: gym.lead_photo}}
          style={styles.gymLeadPhoto} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={[styles.gymTileText, styles.gymTileTitle]}>{this.props.gym.name}</Text>
          </View>
          <View style={styles.subTextContainer}>
            <View style={styles.iconTextCenter}>
              <Icon name="tag" size={16}/>
              <Text style={styles.gymTileText}>{dollarSigns}</Text>
            </View>
            <View style={styles.iconTextCenter}>
              <Icon name="location-pin" size={16}/>
              <Text style={styles.gymTileText}>{this.formatDistance(gym.distance)}</Text>
            </View>
            <View style={styles.iconTextCenter}>
              <Icon name="directions" size={16}/>
              <Text style={styles.gymTileText}>{this.props.gym.location['address_1']}, {this.props.gym.location['city']}</Text>
            </View>
          </View>
          <EnhancedHours hours={gym.hours_enhanced} hoursString={gym.hours}/>
          <View style={styles.descriptionContainer}>
            <Text>Description</Text>
            <Text>{gym.amenities}</Text>
          </View>
        </View>
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
    height: 140,
    width: Layout.window.width
  },
  textContainer: {
    padding: 17,
  },
    titleContainer: {
      marginBottom: 5,
    },
      gymTileTitle: {
        fontSize: 19,
      },
  subTextContainer: {
    display: "flex",
    flexDirection: "row",
  },
    iconTextCenter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 6,
    },
      gymTileText: {
        fontSize: 12,
        marginLeft: 4
      },
  hoursContainer: {
    marginTop: 10
  },
  descriptionContainer: {
    marginTop: 10
  },
})

export default GymDetailContainer
