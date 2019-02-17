import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import QRReaderScreen from '../screens/QRReaderScreen';
import SettingsScreen from '../screens/SettingsScreen';
import QRScreen from '../screens/QRScreen';
import PostCheckInScreen from '../screens/PostCheckInScreen';

import Colors from '../constants/Colors';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  QR: QRScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      iconSet={"feather"}
      name={
        'home'
      }
    />
  ),

};

//todo rename
const GymOwnerStack = createStackNavigator({
  QRReader: QRReaderScreen,
  PostCheckIn: {
    screen: PostCheckInScreen,
    navigationOptions: {
     headerTintColor: "white",
     headerStyle: { backgroundColor: 'black' }
     }
  }
});

GymOwnerStack.navigationOptions = {
  tabBarLabel: 'Scanner',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      iconSet={"feather"}
      name={'camera'}
    />
  ),

};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      iconSet={"ion"}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
    home: HomeStack,
    scan: GymOwnerStack,
    setting: SettingsStack,
  },
  {
    initialRouteName: 'scan'
  }

);
