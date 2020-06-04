import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CustomBottomTabBar from '../components/CustomBottomTabBar';

import HomeScreen from '../screens/HomeScreen';
import QRReaderScreen from '../screens/QRReaderScreen';
import GymListScreen from '../screens/GymListScreen';
import GymDetailScreen from '../screens/GymDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PostCheckInScreen from '../screens/PostCheckInScreen';
import StatsScreen from '../screens/gymOwner/StatsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';

import { fromLeft, fromRight } from 'react-navigation-transitions';

import Colors from '../constants/Colors';

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  if (prevScene
     && prevScene.route.routeName === 'GymList'
     && nextScene.route.routeName === 'GymDetail') {
     return fromRight();
   }
  return fromLeft()
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  GymList: GymListScreen,
  GymDetail: GymDetailScreen
}, {
    transitionConfig: (nav) => handleCustomTransition(nav)
  });

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      iconSet={"ion"}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const QRScanningStack = createStackNavigator({
  QRReader: QRReaderScreen,
  PostCheckIn: {
    screen: PostCheckInScreen,
    navigationOptions: {
     headerTintColor: "white",
     headerStyle: { backgroundColor: 'black',}
     }
  }
});

QRScanningStack.navigationOptions = {
  tabBarLabel: 'Check In',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      iconSet={"ion"}
      name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
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
  Payments: PaymentScreen,
  PaymentSuccess: PaymentSuccessScreen
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
  initialRouteName: 'home',
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
