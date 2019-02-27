import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { AuthStack } from './AuthNavigator';

const RootStack =  createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Auth: AuthStack
},
  {
    initialRouteName: 'Auth'
  }

);
const App = createAppContainer(RootStack)
export default App
