import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ActionCreators from "../actions/loginActions";
import * as UserDetailsActionCreators from '../actions/userDetailActions';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    }
  }

  componentDidMount() {

  }

  render() {
    if (this.props.token !== null) {
      console.log("good login, getting user details and moving the user to the next page");
      this.props.UserActions.getUserDetails(this.props.token)
      this.props.navigation.navigate("Main");
    }
    var loading;
    if (this.props.pending) {
      loading = (
        <ActivityIndicator size="large" color="#0000ff" />
      )
    };
    return (
      <View>
        <Text>Login screen</Text>
        <TextInput
           style={{height: 40, borderColor: 'gray', borderWidth: 1}}
           onChangeText={(text) => this.setState({username: text})}
           value={this.state.text}
         />
         <TextInput
           style={{height: 40, borderColor: 'gray', borderWidth: 1}}
           secureTextEntry={true}
           onChangeText={(text) => this.setState({password: text})}
           value={this.state.text}
         />
         <TouchableOpacity onPress={() => {
           this.props.Actions.attemptLogin(this.state.username, this.state.password);
         }}>
            <Text>Login</Text>
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
    details: state.user.details
  }
}

function mapDispatchToProps(dispatch){
  return {
    Actions: bindActionCreators(ActionCreators, dispatch),
    UserActions: bindActionCreators(UserDetailsActionCreators, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
