import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const ProfileEdit = ({toggleEditing,

}) => {
  // First Name
  // Last Name
  // Billing End Date
  // Payment Tier
  // Birthday
  // Phone
  const [num, setNum] = useState(0)

  return (
    <View>
      <TouchableOpacity onPress={() => {
        setNum(num+1);
      }}>
        <Text>{num}</Text>
      </TouchableOpacity>
    </View>
  )
}
export default ProfileEdit
