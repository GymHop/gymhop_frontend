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
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      error: false
    }
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.token !== null) {
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
            source={require('../assets/images/gymHopWhite.png')} 
            style={styles.headLogo}
            resizeMode='contain'
        />
        <Text style={styles.header}>Login to begin accessing gyms!</Text>
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
    backgroundColor: '#000000',
    width: '100%',
    marginBottom: '10%',

  },

  header: {
    color: '#ffffff',
    fontSize: 18
  },

  loginInput: {
    height: 40,
    backgroundColor: '#ffffff',
    borderColor: 'gray',
    borderWidth: 1,
    color: '#000000',
    marginTop: '5%',
    width: '75%',
    borderRadius: 5,
    textAlign: 'center'
    
  },
  loginButton: {
    backgroundColor: '#ffffff',
    height: '10%',
    width: '50%',
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  loginText: {
    padding: 35,
    fontSize: 24,
    color: '#000000',
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
