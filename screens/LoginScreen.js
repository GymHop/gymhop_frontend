import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Button
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ActionCreators from "../actions/loginActions";
import * as UserDetailsActionCreators from '../actions/userDetailActions';

import { showMessage, hideMessage } from "react-native-flash-message";

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    }
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.token !== null) {
      console.log(this.props.token)
      console.log("good login, getting user details and moving the user to the next page");
      this.props.UserActions.getUserDetails(this.props.token)
      this.props.navigation.navigate("Main");
    } 
  }

  render() {
   
    var loading;
    if (this.props.pending) {
      loading = (
        <ActivityIndicator size="large" color="#0000ff" />
      )
    }
    
    return (
      <View style={styles.container}>
        <Image 
            source={require('../assets/images/loginheader.png')} 
            style={styles.headLogo}
            resizeMode='contain'
        />
        <TextInput
           style={styles.loginInput}
           placeholder={'User ID'}
           placeholderTextColor={'#8f8f8f'}
           onChangeText={(text) => this.setState({username: text})}
           value={this.state.text}
         />
         <TextInput
           style={styles.loginInput}
           placeholder={'Password'}
           placeholderTextColor={'#8f8f8f'}
           secureTextEntry={true}
           onChangeText={(text) => this.setState({password: text})}
           value={this.state.text}
         />
         <TouchableOpacity style={styles.loginButton} onPress={() => {
           this.props.Actions.attemptLogin(this.state.username, this.state.password);
         }}>
            <Text style={styles.loginText}>Login</Text>
         </TouchableOpacity>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity style={styles.registerButton} onPress={() => {
              console.log("pressed on register, bringing to register page");
              this.props.navigation.navigate("Register");
              } 
            }>
              <Text style={styles.registerText}>Register Here!</Text>
            </TouchableOpacity>
         {loading}
      </View>
    )
        }
}

function mapStateToProps(state){
  return {
    token: state.user.token,
    pending: state.user.loginPending,
    details: state.user.details,
  }
}

function mapDispatchToProps(dispatch){
  return {
    Actions: bindActionCreators(ActionCreators, dispatch),
    UserActions: bindActionCreators(UserDetailsActionCreators, dispatch)
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#000000',
    height: '100%'
    // https://facebook.github.io/react-native/docs/stylesheet
    // refer to this
  },

  headLogo: {
    marginTop: '35%',
    backgroundColor: '#000000',
    width: '50%',
    marginBottom: '-20%'

  },

  loginInput: {
    height: 40,
    backgroundColor: '#ffffff',
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: '3%',
    color: '#000000',
    width: '75%',
    borderRadius: 20,
    textAlign: 'center'
    
  },
  loginButton: {
    height: 40,
    backgroundColor: '#8f8f8f',
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  loginText: {
    fontSize: 20,
    color: '#000000',
  },
  registerButton: {
    backgroundColor: '#000000',
  },
  registerText: {
    marginTop: '5%',
    fontSize: 14,
    color: '#8f8f8f',
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
