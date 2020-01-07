import React from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, Button, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProfileEdit from "../components/settings/ProfileEdit";
import ProfilePage from "../components/settings/ProfilePage";

import * as ActionCreators from '../actions/tokenActions';
import * as UserActionCreators from '../actions/userDetailActions';


class SettingsScreen extends React.Component {
  static navigationOptions = {
    header:null
  };

  constructor(props) {
    super(props);
    this.state = {
        editing: false
    }
    this.logout = this.logout.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  logout() {
    this.props.Actions.logout();
    try {
      AsyncStorage.removeItem('@Auth:APIToken');
    } catch (e) {

    }
    this.props.navigation.navigate("Auth");
  }

  toggleEditing() {
    this.setState({editing: !this.state.editing});
  }

  render() {

      return this.state.editing ?
        (<ProfileEdit { ...this.props }
                      toggleEditing={this.toggleEditing}/>)
        :
        (<ProfilePage {...this.props}
                     logout={this.logout}
                     toggleEditing={this.toggleEditing} />)
    }
}
function mapStateToProps(state) {
  return {
    profilePic: state.user.details.picture_url,
    firstName: state.user.details.first_name,
    lastName: state.user.details.last_name,
    birthday: state.user.details.birthday,
    phone: state.user.details.phone,
    tier: state.user.details.payment_tier,
    billingStartDate: state.user.details.billing_start_date,
    token: state.user.token,
    updatePending: state.user.userDetailsUpdatePending,

  }
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(ActionCreators, dispatch),
    UserActions: bindActionCreators(UserActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
