import React from 'react';

import { View, Text, StyleSheet } from 'react-native'
import { styles } from '../../styles/gymOwner/tiles'

const UniqueCheckins = ({num}) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.headlineNumber}>{num}</Text>
      <Text style={styles.descriptor}>Unique People</Text>
    </View>
  )
}

export default UniqueCheckins
