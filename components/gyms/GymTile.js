import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image, StyleSheet, Text,
  TouchableOpacity, View, NavigatorIOS, Header
} from 'react-native';

import QRScreen from "../../screens/QRScreen";

const styles = StyleSheet.create({
  gymTileContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      height: '80%'
  },
  gymTileButton: {
    backgroundColor: '#000000',
    width: '100%',
    marginTop: 20,
    padding: 15

  },
  gymTileText: {
    fontSize: 18,
    color: '#ffffff',
    padding: 5
    
  },
});

export default class GymTile extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <TouchableOpacity onPress={() => {
          console.log("pressed on gym");
          console.log(this.props);
          this.props.navigator.push("QR",{
            title: this.props.gym.name,
            passProps: {gym: this.props.gym}
          })
      }}>
        <View styles={styles.gymTileContainer}>
          <View style={styles.gymTileButton}>
            <Text style={styles.gymTileText}>{this.props.gym.name} {'\n'} Location: {this.props.gym.location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
};