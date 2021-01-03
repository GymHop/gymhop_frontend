import React, { Component } from 'react';

import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Pulse from 'react-native-pulse';

import Icon from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign";
import Layout from '../../constants/Layout';

class ViewGymListBtn extends Component {
  constructor(props) {
    super(props);
    this.leftAnimatedValue_first = new Animated.Value(10);
    this.leftAnimatedValue_second = new Animated.Value(10);
  }

  showBtn = () => {
    Animated.stagger(250, [
    	Animated.timing(this.leftAnimatedValue_first, {
    		toValue: 10,
    	}),
    	Animated.timing(this.leftAnimatedValue_second, {
    		toValue: 10,
    	})
    ]).start();
  }

  hideBtn = () => {
    Animated.stagger(250, [
      Animated.timing(this.leftAnimatedValue_first, {
        toValue: -50,
      }),
      Animated.timing(this.leftAnimatedValue_second, {
        toValue: -50,
      })
    ]).start();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.level != this.props.level) {
      if (this.props.level === 0) {
        this.showBtn();
      } else {
        this.hideBtn();
      }
    }
  }

  render() {

    let paymentsIndicator = this.props.payment_tier === 0 ? (
      <Animated.View style={{alignItems: "center",justifyContent: "center", left: this.leftAnimatedValue_second }}>
        <View style={{zIndex:0, position:"relative",left: 0, top: 70}}><Pulse color='#FF3F4F' numPulses={3} diameter={150} speed={20} duration={1000} /></View>
        <View style={[styles.itemContainer, styles.ccPrompt, ]}>
          <TouchableOpacity style={styles.btnContainer} onPress={() => {
            this.props.navigation.push("Subscribe");
          }}>
            <AntIcon size={30} name="creditcard" />
            <Text style={{fontSize: 16, paddingTop: 5}}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    ) : null;

    return (
      <View style={styles.container}>
        {paymentsIndicator}
        <Animated.View style={[styles.itemContainer, { left: this.leftAnimatedValue_first }]}>
          <TouchableOpacity style={styles.btnContainer} onPress={() => {
            this.props.navigation.push("GymList");
          }}>
              <Icon size={30} name="ios-list" />
              <Text style={{fontSize: 16, paddingTop: 5}}>List of Gyms</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 2, // map is 1
    bottom: Layout.window.height * .2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: Layout.window.width * .25,
    height: Layout.window.height * .1,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: 25,

  },
  btnContainer: {
    flexDirection: "column",
    alignItems: 'center',
    paddingHorizontal: 5,
  }
})

function mapStateToProps(state) {
  return {
    level: state.ui.pullUpLevel,
    payment_tier: state.user.details.payment_tier
  }
}


export default connect(mapStateToProps)(withNavigation(ViewGymListBtn))
