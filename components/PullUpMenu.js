import React, { Component } from 'react';

import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';
import Layout from '../constants/Layout';

const closedDistanceFromBottom = Layout.window.height * .85 - 49;
const mediumDistanceFromBottom = Layout.window.height * .65 - 49;
const openDistanceFromBottom = Layout.window.height * .1 - 49;

class PullUpMenu extends Component {
  constructor(props) {
    super(props);

    this.levels = ["CLOSED", "MEDIUM",, "FULL"]
    this.levelValues = [closedDistanceFromBottom,
                        mediumDistanceFromBottom,
                        openDistanceFromBottom, ]
    this.state = {
      currentLevel: 0
    }

    this.heightAnimatedValue = new Animated.Value(closedDistanceFromBottom);

    this._panResponder = PanResponder.create({
        // Ask to be the responder
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderMove: (e, gestureState) => {
          console.log(gestureState.dy);
          // this.heightAnimatedValue.setValue(closedDistanceFromBottom + gestureState.dy)
        },
        onPanResponderRelease: (evt, gestureState) => {
          //determine which open size to open to
          // if they do a big swipe animated all the way down/up
          if (gestureState.dy > Layout.window.height *.5) {
            this.animateToLevel(0);
            return;
          } else if (gestureState.dy < -Layout.window.height *.5) {
            this.animateToLevel(2);
            return;
          }


          if (gestureState.dy > 15) {
            this.animateDownALevel();
            return;
          } else if (gestureState.dy < -15) {
            this.animatedUpALevel();
            return;
          }
        }
      });
  }

  animatedUpALevel = () => {
    console.log("moving up a level");
    if (this.state.currentLevel === 2) {
      return
    }
    Animated.spring(
      this.heightAnimatedValue,
      {
        toValue: this.levelValues[this.state.currentLevel + 1]
      }
    ).start()
    this.setState({currentLevel: this.state.currentLevel + 1})
  }
  animateDownALevel = () => {
    console.log("moving down a level");
    if (this.state.currentLevel === 0) {
      return;
    }

    Animated.spring(
      this.heightAnimatedValue,
      {
        toValue: this.levelValues[this.state.currentLevel - 1]
      }
    ).start()
    this.setState({currentLevel: this.state.currentLevel - 1})
  }

  animateToLevel = (level) => {
    Animated.spring(
      this.heightAnimatedValue,
      {
        toValue: this.levelValues[level]
      }
    ).start()
    this.setState({currentLevel: level})
  }

  render() {

    let widthInterpolatedValue = this.heightAnimatedValue.interpolate({
      inputRange: [Math.round(closedDistanceFromBottom/4), Math.round(closedDistanceFromBottom/1.5),],
      outputRange: [Layout.window.width, Layout.window.width * .9,],
      extrapolate: "clamp"
    })
    let leftInterpolatedValue = this.heightAnimatedValue.interpolate({
      inputRange: [Math.round(closedDistanceFromBottom/4), Math.round(closedDistanceFromBottom/1.5)],
      outputRange: [0, Layout.window.width * 0.05,],
      extrapolate: "clamp"
    })

    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        style={[styles.container,
                {
                  width: widthInterpolatedValue,
                  top: this.heightAnimatedValue,
                  marginLeft: leftInterpolatedValue
                }
        ]}>
        <View style={styles.pullUpBarContainer}>
          <View style={styles.pullUpBar}></View>
        </View>
        {this.props.children}
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 6,
    paddingHorizontal:5,
    zIndex: 10,
  },
  pullUpBarContainer: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"

  },
    pullUpBar: {
      height: 7,
      width: 60,
      borderRadius:10,
      backgroundColor: "#97999988"
    }
})

export default PullUpMenu
