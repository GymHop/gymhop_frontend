import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image, StyleSheet, Text,
  TouchableOpacity, View, NavigatorIOS,
} from 'react-native';

import QRScreen from "../../screens/QRScreen";

const styles = StyleSheet.create({
  item: {
    width: "40%",
  }
})

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
        <View style={styles.item}>
          <Text>{this.props.gym.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
