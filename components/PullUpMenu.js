import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import Layout from "../constants/Layout";
import { setPullUpLevel } from "../actions/uiActions";

const closedDistanceFromBottom = Layout.window.height * 0.7;
const mediumDistanceFromBottom = Layout.window.height * 0.5 - 49;
const openDistanceFromBottom = Layout.window.height * 0.07;

class PullUpMenu extends Component {
  constructor(props) {
    super(props);

    this.levels = ["CLOSED", "MEDIUM", "FULL"];
    this.levelValues = [
      closedDistanceFromBottom,
      mediumDistanceFromBottom,
      openDistanceFromBottom,
    ];
    this.state = {
      currentLevel: 0,
      allowMenuMovement: true,
      justHitLevelTwo: false,
    };
    // is at top of scroll view?
    // is within top scroll view range (image height most likely)

    this.heightAnimatedValue = new Animated.Value(closedDistanceFromBottom);

    // create another pan handler for little top side of container to be able close container
    this.wrapperPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, g) => true,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
    });

    this._panResponder = PanResponder.create({
      // Ask to be the responder
      onStartShouldSetPanResponder: this.shouldAllowPanresponderSet,
      onStartShouldSetPanResponderCapture: this.shouldAllowPanresponderCapture,
      onMoveShouldSetPanResponder: this.shouldAllowPanresponderSet,
      onMoveShouldSetPanResponderCapture: this.shouldAllowPanresponderCapture,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentLevel != this.state.currentLevel) {
      this.props.setPullUpLevel(this.state.currentLevel);
    }
  }

  //took out responder move handler methos to don`t repeat  1 code 2 times for another pan handler
  onPanResponderMove = (e, gestureState) => {
    // this.heightAnimatedValue.setValue(closedDistanceFromBottom + gestureState.dy)
    if (this.state.currentLevel === 0 && gestureState.dy < 0) {
      this.heightAnimatedValue.setValue(
        closedDistanceFromBottom + gestureState.dy
      );
    }
  };

  //took out responder release handler methos to don`t repeat  1 code 2 times for another pan handler
  onPanResponderRelease = (evt, gestureState) => {
    //determine which open size to open to
    // if they do a big swipe animated all the way down/up
    if (gestureState.dy > Layout.window.height * 0.25) {
      this.setState({ allowMenuMovement: true });
      this.animateToLevel(0);
      return;
    } else if (gestureState.dy < -Layout.window.height * 0.25) {
      this.setState({ allowMenuMovement: true });
      this.animateToLevel(2);
      return;
    }

    if (gestureState.dy > 10) {
      this.animateDownALevel();
      return;
    } else if (gestureState.dy < -10) {
      this.animatedUpALevel();
      return;
    }
  };

  shouldAllowPanresponderCapture = (evt, gestureState) => {
    if (
      this.state.currentLevel === 1 &&
      gestureState.dy < 5 &&
      gestureState.dy > -5
    ) {
      this.setState({ allowMenuMovement: false });
      this.shouldAllowPanresponderSet();
      return;
    } else if (this.state.currentLevel === 2 && gestureState.dy > -20) {
      return this.setState({ allowMenuMovement: false });
    } else {
      return this.setState({ allowMenuMovement: true });
    }
    // if they swipe up
    // and we are at the top of the menu
    // and the menu is fully open
    //      -> then disable panresponder
    // otherwise allow
  };

  shouldAllowPanresponderSet = (evt, gestureState) => {
    return this.state.currentLevel !== 2;
    // if (this.state.justHitLevelTwo && gestureState.dy < 0) {
    //   return true;
    // }
    // return this.shouldAllowPanresponderCapture(evt, gestureState)
  };

  animatedUpALevel = () => {
    if (this.state.currentLevel === 2) {
      this.setState({ allowMenuMovement: false, justHitLevelTwo: true });
      return;
    }
    Animated.spring(this.heightAnimatedValue, {
      toValue: this.levelValues[this.state.currentLevel + 1],
    }).start();
    if (this.state.currentLevel === 1) {
      this.setState({
        currentLevel: this.state.currentLevel + 1,
        allowMenuMovement: true,
        justHitLevelTwo: true,
      });
    } else {
      this.setState({ currentLevel: this.state.currentLevel + 1 });
    }
  };
  animateDownALevel = () => {
    console.log("moving down a level");
    if (this.state.currentLevel === 0) {
      return;
    }

    Animated.spring(this.heightAnimatedValue, {
      toValue: this.levelValues[this.state.currentLevel - 1],
    }).start();
    this.setState({ currentLevel: this.state.currentLevel - 1 });
  };

  animateToLevel = (level) => {
    Animated.spring(this.heightAnimatedValue, {
      toValue: this.levelValues[level],
    }).start();

    if (level === 2) {
      this.setState({
        currentLevel: level,
        allowMenuMovement: false,
        justHitLevelTwo: true,
      });
    } else {
      this.setState({ currentLevel: level });
    }
  };

  isScrollAtTop = ({ nativeEvent }) => {
    if (this.state.justHitLevelTwo) {
      this.setState({ justHitLevelTwo: false });
      this.setState({ allowMenuMovement: true });
    }
    if (nativeEvent.contentOffset != undefined) {
      if (nativeEvent.contentOffset.y === 0) {
        this.setState({ allowMenuMovement: true });
      } else {
        this.setState({ allowMenuMovement: false });
        this.animatedUpALevel();
      }
    } else {
      console.log("cant capture scroll event");
      this.setState({ allowMenuMovement: false });
    }
  };

  isScrollAtTopMomentum = ({ nativeEvent }) => {
    // we're at the top
    if (nativeEvent.contentOffset.y === 0) {
      this.animateToLevel(0);
      this.setState({ allowMenuMovement: true });
    }
  };

  render() {
    let widthInterpolatedValue = this.heightAnimatedValue.interpolate({
      inputRange: [
        Math.round(mediumDistanceFromBottom),
        Math.round(closedDistanceFromBottom),
      ],
      outputRange: [Layout.window.width, Layout.window.width * 0.9],
      extrapolate: "clamp",
    });
    let leftInterpolatedValue = this.heightAnimatedValue.interpolate({
      inputRange: [
        Math.round(mediumDistanceFromBottom),
        Math.round(closedDistanceFromBottom),
      ],
      outputRange: [0, Layout.window.width * 0.05],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        style={[
          styles.container,
          {
            width: widthInterpolatedValue,
            top: this.heightAnimatedValue,
            marginLeft: leftInterpolatedValue,
          },
        ]}
        useNativeDriver={true}
      >
        <View
          {...this.wrapperPanResponder.panHandlers} //add another handler to that part from where you want to close the container
          style={styles.pullUpBarContainer}
        >
          <View style={styles.pullUpBar}></View>
        </View>
        <ScrollView
          contentContainerStyle={styles.tabbarPadded}
          onScroll={this.isScrollAtTop}
          onMomentumScrollEnd={this.isScrollAtTopMomentum}
        >
          {this.props.children}
        </ScrollView>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 6,
    zIndex: 10,
    maxHeight: Layout.window.height * 0.93 - 49,
  },
  pullUpBarContainer: {
    paddingVertical: 6,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pullUpBar: {
    height: 8,
    width: 60,
    borderRadius: 10,
    backgroundColor: "#97999988",
  },
  tabbarPadded: {
    paddingBottom: 200,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    setPullUpLevel: (level) => dispatch(setPullUpLevel(level)),
  };
}

export default connect(null, mapDispatchToProps)(PullUpMenu);
