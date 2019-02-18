import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CustomBottomTabBar from '../components/CustomBottomTabBar';

import HomeScreen from '../screens/HomeScreen';
import QRReaderScreen from '../screens/QRReaderScreen';
import SettingsScreen from '../screens/SettingsScreen';
import QRScreen from '../screens/QRScreen';
import PostCheckInScreen from '../screens/PostCheckInScreen';
import StatsScreen from '../screens/gymOwner/StatsScreen';

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

const QRScanningStack = createStackNavigator({
  QRReader: QRReaderScreen,
  PostCheckIn: {
    screen: PostCheckInScreen,
    navigationOptions: {
     headerTintColor: "white",
     headerStyle: { backgroundColor: 'black' }
     }
  }
});

QRScanningStack.navigationOptions = {
  tabBarLabel: 'Scanner',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      iconSet={"feather"}
      name={'camera'}
    />
  ),

};

// **** HEY LOOK OVER HERE
// ok heres how it works
// we basically took the normal buttom nav component and added a filter to exclude the stats tab if they are not a gym owner
// Lot of replication but its the only way i could get it to work. its been hours D:
// main issue is that you cant use redux state in any of these constructors that create the navigators
// if you can figure out a better way and explain it to me, ill buy you a beer
// *******************************************
const GymOwnerStack = createStackNavigator({
  Stats: StatsScreen,
})

GymOwnerStack.navigationOptions = {
  tabBarLabel: 'Your stats',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      iconSet={"foundation"}
      name={'graph-trend'}
    />
  ),
}

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


var bottomTabNavSettings = {
  initialRouteName: 'scan',
  tabBarComponent: props =>
      <CustomBottomTabBar
        {...props}
        style={{ borderTopColor: '#605F60' }}
      />,
};

// if (getUserStatus(store.getState().user)) {
//   // gymOwner:GymOwnerStack
//   console.log("GYM OWNER SIGNED IN");
//   stacks.gymOwner = GymOwnerStack;
//   bottomTabNavSettings.initialRouteName = "gymOwner"
// }

export default createBottomTabNavigator(
  {
      home: HomeStack,
      scan: QRScanningStack,
      setting: SettingsStack,
      gymOwner:GymOwnerStack
  },
  bottomTabNavSettings
);
