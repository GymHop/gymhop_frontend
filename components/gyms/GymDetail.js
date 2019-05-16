import React from 'react';

import openMap from 'react-native-open-maps';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';
import { styles } from "../../styles/gymList/detail";
import { getTierDisplay } from "./helpers";
import Colors from "../../constants/Colors";


const GymDetail = ({gym}) => {
  const goToGym = () => {
    openMap({
       latitude: parseFloat(gym.latitude),
       longitude: parseFloat(gym.longitude)
    })
  }
  let hours = gym.hours ? <Text>Hours:{"\n"}{gym.hours}</Text> : null;


  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View style={styles.detailContainer}>
          {hours}
          {/* <Text>{gym.amenities}</Text> */}
        </View>
         <View style={styles.tierContainer}>
            <Text>{gym.amenities}</Text>
           {/* <Text style={styles.tierText}>{getTierDisplay(gym.price)}</Text>  */}
        </View>
      </View>

      <View style={styles.actionContainer}>

        <View style={styles.actionButton}>
            <Button
                color={Colors.tintColor}
                onPress={goToGym}
                title="Open Map 🗺" />
        </View>
        <View style={styles.actionButton}>
            <Button
                color={Colors.tintColor}
                onPress={() => {
                  Linking.openURL(gym.website_url)
                }}
                title={"Go to their site"} />
        </View>
      </View>

    </View>
  )
}
export default GymDetail
