import React from 'react';

import { View, Text, StyleSheet } from 'react-native'
import CheckinItem from './CheckinItem';

const CheckinList = ({checkins}) => {

  return (
    <View>
      {checkins.map((checkin, idx) => {
        return <CheckinItem key={checkin.id} checkin={checkin} />
      })}
    </View>
  )
}
export default CheckinList
