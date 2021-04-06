import React, { Component } from 'react';

import { View, Text, StyleSheet, Image } from 'react-native';
import Layout from '../../constants/Layout';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import EnhancedHours from './EnhancedHours';
import TodaysHours from './TodaysHours';
import GymSchedule from './Schedule';
import ActionBar from './ActionBar';
import {SliderBox} from 'react-native-image-slider-box';

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


    let gymPhotos = gym.photos.map(a => a.url)


    return (
      <View style={styles.container}>
        <View style={styles.gymPhotoContainer}>
          <SliderBox images={gymPhotos} style={styles.gymLeadPhoto} circleLoop disableOnPress/>
          {/* <Image
          source={{uri: gym.lead_photo}}
          style={styles.gymLeadPhoto} /> */}
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={[styles.gymTileTitle]}>{this.props.gym.name}</Text>
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
              <TodaysHours hours={gym.hours_enhanced} />
            </View>
          </View>
          <ActionBar gym={gym} />
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>Description</Text>
            <Text style={styles.descriptionDetailText}>{gym.amenities}</Text>
          </View>
          <EnhancedHours hours={gym.hours_enhanced} hoursString={gym.hours}/>
            <GymSchedule gym={gym} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: Layout.window.height * .9 - 49,
  },
  gymPhotoContainer: {},
  gymLeadPhoto: {
    height: 200,
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
        color: 'black'
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
        marginLeft: 7
      },
  hoursContainer: {
    marginTop: 10
  },
  descriptionContainer: {
    marginTop: 10
  },
    descriptionText: {
      marginBottom: 3,
      fontWeight: "bold",
      color: 'black'
    },
    descriptionDetailText: {
      color: 'black'
    }
})

export default GymDetailContainer
