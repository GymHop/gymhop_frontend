import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';


import {
  View, Text, Image
} from 'react-native';

export default class QRScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    // QR code generation need to be dynamic and secure
    // not my problem for now, just going to be the pk of the gym + gym_name
    let gym = this.props.navigation.state.params.passProps.gym;
    // console.log(this.props);
    // value is gym id _ gym name _ user id
    return (
      <View>
        <Text>QR Screen for {gym.name}</Text>
        <QRCode
         value={(gym.id+ "_" + gym.name + "_" + "1")}
         size={200}
         bgColor='purple'
         fgColor='white'/>
      </View>
    )
  }
}
