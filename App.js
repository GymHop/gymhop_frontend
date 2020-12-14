import 'react-native-gesture-handler';

import React from 'react';
import { Platform, StatusBar, StyleSheet, View} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import AppNavigator from './navigation/AppNavigator';


import { Provider } from 'react-redux';

import { configureStore } from './store';

import FlashMessage from "react-native-flash-message";

export const store = configureStore({});


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
      return (
        <Provider store={store} >
          <SafeAreaView style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
            <AppNavigator/>
            <FlashMessage position="top" />
          </SafeAreaView>
        </Provider>
      );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
