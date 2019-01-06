import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Button
} from 'react-native';


class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        username: null
        password: null
      }
  }

    render() {
      return (
        <View style={styles.container}>  
          <Image 
            source={require('../assets/images/gymHopWhite.png')} 
            style={styles.headLogo}
            resizeMode='contain'
        />
        <TextInput
          styles={styles.loginInput}
          placeholder={'Enter new user ID'}
          placeholderTextColor={'#8f8f8f'}
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.text}
        />
        <TextInput
          styles={styles.loginInput}
          placeholder={'Enter new password'}
          placeholderTextColor={'#8f8f8f'}
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.text}
        />
        </View>

      )
    }
    

}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  loginInput: {
    height: 40,
    backgroundColor: '#ffffff',
    borderColor: 'gray',
    borderWidth: 1,
    color: '#000000',
    marginTop: '5%',
    width: '75%' 
},
})