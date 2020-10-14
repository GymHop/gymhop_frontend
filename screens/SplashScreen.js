import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Image} from 'react-native';
import Layout from '../constants/Layout';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ActionCreators from "../actions/loginActions";
import * as TokenActionCreators from '../actions/tokenActions';
import * as UserDetailsActionCreators from '../actions/userDetailActions';

import SplashScreen from 'react-native-splash-screen'

class WelcomeScreen extends Component {
    static navigationOptions = {
        header: () => false,
      };
    constructor(props) {
        super(props);
        this.getToken();
    }

    getToken = async () => {
        const token = await AsyncStorage.getItem("@Auth:APIToken");
        if (token != null) {
          this.props.TokenActions.setToken(token);
          // setting the token will make component did update fire
          this.props.UserActions.getUserDetails(this.props.token)
          this.props.navigation.navigate("Main");
          SplashScreen.hide();
        } else {
          this.props.navigation.navigate("Login");
          SplashScreen.hide();
        }
      }

      componentDidMount() {
        this.getToken()
      }

    render() {
        return(
          <View style={{backgroundColor: '#ffd1dc', flex: 1}}>
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
      TokenActions: bindActionCreators(TokenActionCreators, dispatch),
      UserActions: bindActionCreators(UserDetailsActionCreators, dispatch)
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);