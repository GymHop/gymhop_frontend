import React from 'react';

import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux';

class RegisterPart2 extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      //user profile fields here
    }
    this._storeToken = this._storeToken.bind(this);
  }

  _storeToken = async () => {
    try {
      await AsyncStorage.setItem('@Auth:APIToken', this.props.token);
    } catch (e) {
      console.log("ISSUE STORING TOKEN FUCK");
    }
  };

  registerUser() {
    // todo hookup redux
    this.props.Actions.registerUser({
      ...this.state,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.success === true && this.props.userProfileSuccess === True) {
      console.log("good register of user AND user profile, moving the user to the home page");
      this._storeToken();
      this.props.navigation.push("Main");
    }
  };

  render () {
    return (
      <View>
      <Text>RegisterPart2</Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    success: state.user.registeredSuccessfully,
    userProfileSuccess: false
  }
}
export default connect()(RegisterPart2)
