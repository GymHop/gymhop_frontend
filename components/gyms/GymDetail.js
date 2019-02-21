import React from 'react';

import openMap from 'react-native-open-maps';
import { View, Text, StyleSheet, Button } from 'react-native'

const GymDetail = ({gym}) => {
  console.log(gym);
  const goToGym = () => {
    openMap({
       latitude: parseFloat(gym.latitude),
       longitude: parseFloat(gym.longitude)
    })
  }

  return (
    <View>
      <Text>GymDetail</Text>
      <Button
              color={'#bdc3c7'}
              onPress={goToGym}
              title="Click To Open Maps 🗺" />
    </View>
  )
}
export default GymDetail
