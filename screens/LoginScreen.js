import React, { Component } from 'react';
import {
  View, Text, TextInput
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ActionCreators from "../actions/loginActions";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    }
  }

  render() {
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
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    token: state.user.token,
    pending: state.user.pending,
    details: state.user.details
  }
}

function mapDispatchToProps(dispatch){
  return {
    Actions: bindActionCreators(ActionCreators, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
