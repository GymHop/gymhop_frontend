import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

import { createStore, applyMiddleware } from 'redux';
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
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
            <FlashMessage position="top" />
          </View>
        </Provider>
      );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
