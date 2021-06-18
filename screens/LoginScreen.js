import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Platform,
  ActivityIndicator, StyleSheet, Image, Button, KeyboardAvoidingView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ActionCreators from "../actions/loginActions";
import * as TokenActionCreators from '../actions/tokenActions';
import * as UserDetailsActionCreators from '../actions/userDetailActions';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

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
    this._storeToken = this._storeToken.bind(this);
    // this.getToken();
  }

  // getToken = async () => {
  //    const token = await AsyncStorage.getItem("@Auth:APIToken");
  //    if (token != null) {
  //      this.props.TokenActions.setToken(token);
  //      // setting the token will make component did update fire
  //    }
  //  }
  // componentDidMount() {
  //
  // }

  _storeToken = async () => {
    try {
      await AsyncStorage.setItem('@Auth:APIToken', this.props.token);
      console.log("Stored", this.props.token);
    } catch (e) {
      console.log('error saving tokken');
      console.log(e);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.token !== null) {
      this._storeToken();
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
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios'?'padding':null} enabled>
        <View style={styles.headLogoContainer}>
          <Image
            source={require('../assets/images/bunnyblackwhite.png')}
            style={styles.headLogo}
            resizeMode='contain'
          />
        </View>
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
              <Text style={styles.registerText}>Click here to register!</Text>
            </TouchableOpacity>
         {loading}
         <View style={{ flex: 1 }} />
      </KeyboardAvoidingView>
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
    TokenActions: bindActionCreators(TokenActionCreators, dispatch),
    UserActions: bindActionCreators(UserDetailsActionCreators, dispatch)
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Colors.tabBar,
    height: '100%',
    paddingBottom: 50
    // https://facebook.github.io/react-native/docs/stylesheet
    // refer to this
  },
  headLogoContainer: {
    width: '60%',
  },
  headLogo: {
    marginTop: Platform.OS === 'ios' ? '10%' : '-10%',
    backgroundColor: Colors.tabBar,
    width: '100%',
    marginBottom: '-30%',
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
    textAlign: 'center',

  },
  loginButton: {
    height: 40,
    backgroundColor: '#000000',
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'red'
  },
  loginText: {
    fontSize: 20,
    color: '#ffffff',
  },
  registerButton: {
    backgroundColor: Colors.tabBar,
  },
  registerText: {
    marginTop: '5%',
    fontSize: 16,
    color: 'black',
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
