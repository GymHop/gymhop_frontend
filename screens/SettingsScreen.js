import React from 'react';
import {
  View, Text, Image, StyleSheet,
  AsyncStorage, Button
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ActionCreators from '../actions/tokenActions';



class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Your Profile',
  };

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

  }

  logout() {
    this.props.Actions.logout();
    try {
      AsyncStorage.removeItem('@Auth:APIToken');
    } catch (e) {

    }
    this.props.navigation.navigate("Auth");
  }

  render() {
    var tierType
    switch (this.props.tier) {
      case 1:
        tierType = "Budget Tier";
        break;
      case 2:
        tierType = "Premium tier";
        break;
      default:
          tierType = "No Tier"
    }
    return (
      <View style={styles.profileContainer}>
        <Image source={{uri: this.props.profilePic}}
          style={{width: 150, height: 150}}
        />
        <Text>{this.props.firstName} {this.props.lastName}</Text>
        <Text>{tierType}</Text>
        <Button onPress={this.logout}
        title="Logout"
        ></Button>
      </View>
      )
    }
}
function mapStateToProps(state) {
  return {
    profilePic: state.user.details.picture_url,
    firstName: state.user.details.first_name,
    lastName: state.user.details.last_name,
    birthday: state.user.details.birthday,
    phone: state.user.details.phone,
    tier: state.user.details.payment_tier
  }
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(ActionCreators, dispatch)
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  }
})



export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
