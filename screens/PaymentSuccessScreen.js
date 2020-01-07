import React, { Component } from 'react';

import { View, Text, StyleSheet,
         Image, Linking, TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { getUserDetails } from '../actions/userDetailActions';

class PaymentSuccessScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserProfile(this.props.token) // refresh data
  }

  static navigationOptions = {
    header: null,
  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>You're Subscribed</Text>
        <Image source={require("../assets/images/undraw_healthy_habit_green.png")} style={styles.image} />
        <View style={styles.textContainer}>
          <Text>Wecome to our community!</Text>
          <Text>If you'd like to cancel please contact</Text>
          <TouchableWithoutFeedback onPress={() => {
            Linking.openURL('mailto:contact@gymhop.us?subject=Cancel%20Subscription&body=Let%20us%20know%20what%20we%20could%20do%20better')
          }}><Text style={styles.blueText}>contact@gymhop.us</Text></TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontSize: 24
  },
  image: {
    width: 300,
    height: 300
  },
  textContainer: {
    marginTop: 15,
    color: "black"
  },
  blueText: {
    color: "#0000EE"
  }
})
function mapStateToProps(state) {
  return {
    token: state.user.token
  }
}


function mapDispatchToProps(dispatch) {
  return {
    getUserProfile: (token) => dispatch(getUserDetails(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccessScreen)
