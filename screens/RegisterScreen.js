import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Button
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ActionCreators from "../actions/registerActions";
import * as RegisterUserActionCreators from '../actions/registerActions';




class RegisterScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
      this.state = {
        username: null,
        password: null,
        email: null
      }
  }

  componentDidMount() {

  }

  // componentDidUpdate wont run the first render but runs every other time something happens
  // on the screen
  componentDidUpdate(prevProps, prevState) {
    if (this.props.success === true) {
      console.log("good register, moving the user to the next page");
      console.log("The token is ", this.props.token)
      this.props.navigation.navigate("Home");
    }
  };
    render() {

      var loading;
      if (this.props.pending) {
        loading = (
          <ActivityIndicator size="large" color="#0000ff" />
        )
      }
      let errors;
      if (this.props.error) {
        errors = (<View>
          {Object.keys(this.props.errors).map((key, idx) => {
              return <Text key={idx}>{key}: {this.props.errors[key][0]}</Text>
            })
          }
        </View>)
      }
     

      return (
        <View style={styles.container}>  
          <Image 
            source={require('../assets/images/gymHopWhite.png')} 
            style={styles.headLogo}
            resizeMode='contain'
        />
        {errors}
        <TextInput
          style={styles.registerInput}
          placeholder={'Enter new user ID'}
          placeholderTextColor={'#8f8f8f'}
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.text}
        />
        <TextInput
          style={styles.registerInput}
          placeholder={'Enter new password'}
          placeholderTextColor={'#8f8f8f'}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.text}
        />
        <TextInput
          style={styles.registerInput}
          placeholder={'Enter your email adress'}
          placeholderTextColor={'#8f8f8f'}
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.text}
        />
        <TouchableOpacity style={styles.registerButton} onPress={() => {
           this.props.Actions.registerUser({
             username: this.state.username, 
             password: this.state.password,
             email: this.state.email});
         }}>
            <Text style={styles.registerText}>Register</Text>
         </TouchableOpacity>

        </View>

      )
        }
      }

      function mapStateToProps(state){
        return {
          pending: state.user.registerPending,
          details: state.user.details,
          success: state.user.registeredSuccessfully,
          token: state.user.token,
          error: state.user.error,
          errors: state.user.errors
        }
      }
      
      function mapDispatchToProps(dispatch){
        return {
          Actions: bindActionCreators(ActionCreators, dispatch),
          UserActions: bindActionCreators(RegisterUserActionCreators, dispatch)
        }
      }

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  registerInput: {
    height: 40,
    backgroundColor: '#ffffff',
    borderColor: 'gray',
    borderWidth: 1,
    color: '#000000',
    marginTop: '5%',
    width: '75%' 
},
registerButton: {
  backgroundColor: '#ffffff',
  height: '10%',
  width: '50%',
  marginTop: '10%',
  justifyContent: 'center',
  alignItems: 'center'
},
registerText: {
  padding: 35,
  fontSize: 24,
  color: '#000000',
}
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
