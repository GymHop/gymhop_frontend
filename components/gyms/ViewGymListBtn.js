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
        <View style={{zIndex:0, position:"relative",left: 0, top: 30}}><Pulse color='#FF3F4F' numPulses={4} diameter={70} speed={20} duration={1400} /></View>
        <View style={[styles.itemContainer, styles.ccPrompt, ]}>
          <TouchableOpacity style={styles.btnContainer} onPress={() => {
            this.props.navigation.push("Subscribe");
          }}>
            <AntIcon size={20} name="creditcard" />
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
            <Icon size={20} name="ios-list" />
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
    bottom: 49 + 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 43,
    height: 43,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: 10,

  },
  btnContainer: {
    flexDirection: "row"
  }
})

function mapStateToProps(state) {
  return {
    level: state.ui.pullUpLevel,
    payment_tier: state.user.details.payment_tier
  }
}


export default connect(mapStateToProps)(withNavigation(ViewGymListBtn))
