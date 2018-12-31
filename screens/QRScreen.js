import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
import { StyleSheet } from 'react-native';

import {
  View, Text, Image
} from 'react-native';

class QRScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    // QR code generation need to be dynamic and secure
    // not my problem for now, just going to be the pk of the gym + gym_name
    // using the token as the auth for the user. Security is handled server side so there shouldnt be an issue
    let gym = this.props.navigation.state.params.passProps.gym;
    // console.log(this.props);
    // value is gym id _ gym name
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Check In to {gym.name}!</Text>
        <QRCode
         value={(gym.id + "_" + gym.name)}
         size={200}
         bgColor='purple'
         fgColor='white'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
    // https://facebook.github.io/react-native/docs/stylesheet
    // refer to this
  },
  title: {
    color: '#000000'
  }
})

export default QRScreen