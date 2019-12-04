import React, { Component } from 'react';

import { View, Text, StyleSheet, Animated } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import Layout from '../../constants/Layout'

class ViewGymListBtn extends Component {
  constructor(props) {
    super(props);
    this.leftAnimatedValue = new Animated.Value(10);
  }

  showBtn = () => {
    Animated.timing(
      this.leftAnimatedValue,
      {
        toValue: 10,
      }
    ).start()
  }

  hideBtn = () => {
    Animated.timing(
      this.leftAnimatedValue,
      {
        toValue: -50
      }
    ).start()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.level != this.props.level) {
      if (level === 0) {
        this.showBtn();
      } else {
        this.hideBtn();
      }
    }
  }

  render() {
    return (
      <Animated.View style={[styles.container, { left: this.leftAnimatedValue }]}>
        <View style={styles.btnContainer}>
          <Icon size={20} name="ios-list" />
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 43,
    height: 43,
    borderRadius: 15,
    position: "absolute",
    zIndex: 2, // map is 1
    bottom: Layout.window.height * .16 - 49,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

  },
  btnContainer: {
    flexDirection: "row"
  }
})

function mapStateToProps(state) {
  return {
    level: state.ui.pullUpLevel
  }
}


export default connect(mapStateToProps)(withNavigation(ViewGymListBtn))
