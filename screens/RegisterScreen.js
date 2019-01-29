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
        passwordConf: null,
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
  handlePasswordConfirmation = (password, passwordConf) => {
    // perform all neccassary validations
    let pass = this.state.password;
    let passConf = this.state.passwordConf;
    if (pass !== passConf) {
        console.log("Password's do not match")
    } else { // If password matches, attempt register
      this.props.Actions.registerUser({
        username: this.state.username, 
        password: this.state.password,
        email: this.state.email});
    }
}
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
            source={require('../assets/images/loginheader.png')} 
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
          placeholder={'Confirm password'}
          placeholderTextColor={'#8f8f8f'}
          onChangeText={(text) => this.setState({passwordConf: text})}
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
          this.handlePasswordConfirmation();
         }
         }>
            <Text style={styles.registerText}>Register</Text>
         </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={() => {
              console.log("Returning user to login page");
              this.props.navigation.navigate("Login");
              } 
            }>
            <Text style={styles.loginText}>Return to login</Text>
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#000000',
    height: '100%'
  },
  headLogo: {
    marginTop: '10%',
    backgroundColor: '#000000',
    width: '50%',
    marginBottom: '-20%'
  
  },
  registerInput: {
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
registerButton: {
  height: 40,
  backgroundColor: '#8f8f8f',
  width: '75%',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
},
registerText: {
  fontSize: 20,
  color: '#000000',
},
loginButton: {
  backgroundColor: '#000000',
},
loginText: {
  marginTop: '5%',
  fontSize: 14,
  color: '#8f8f8f',
}
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
