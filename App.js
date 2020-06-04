import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import AppNavigator from './navigation/AppNavigator';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { configureStore } from './store';

import FlashMessage from "react-native-flash-message";
import {Provider as AuthProvider} from './context/AuthContext';

export const store = configureStore({});


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
      return (
        <Provider store={store} >
          <AuthProvider>
          <SafeAreaView style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
            <AppNavigator />
            <FlashMessage position="top" />
          </SafeAreaView>
          </AuthProvider>
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
