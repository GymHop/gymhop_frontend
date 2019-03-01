import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import Ion from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const TabBarIcon = ({iconSet,
                    name,
                    focused }) => {
  switch (iconSet) {

     case 'feather':
       return (
         <Feather
         name={name}
         size={26}
         style={{ marginBottom: -3 }}
         color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
         />
       )
     case 'foundation':
       return (
         <Foundation
           name={name}
           size={26}
           style={{ marginBottom: -3 }}
           color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
         />
       )
     default:
       return (
         <Ion
           name={name}
           size={26}
           style={{ marginBottom: -3 }}
           color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
         />
       );
   }
}
export default TabBarIcon
