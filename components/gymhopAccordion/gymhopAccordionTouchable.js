import React, {Component} from 'react';
import {LayoutAnimation, Platform, UIManager} from 'react-native';
import {View, PanResponder, } from 'react-native';

var CustomLayoutAnimation = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

class GymhopTouchable extends Component {
    constructor(props) {
        super(props);
        console.log("Gymhop Touchable Initialized")
        if (Platform.OS === "android") {
          UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.state = {
            
        };
        this._panResponder = PanResponder.create({
            // Ask to be the responder
            onStartShouldSetPanResponder: (evt, gestureState) => this.allowSingleClicksThrough(evt, gestureState),
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => this.allowSingleClicksThrough(evt, gestureState),
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => this.allowSingleClicksThrough(evt, gestureState),
            onShouldBlockNativeResponder: (evt, gestureState) => false,
            onPanResponderMove: (e, gestureState) => {
              console.info('onPanResponderMove', gestureState.dx);
              // React to the movement!
              
              LayoutAnimation.configureNext(CustomLayoutAnimation);
            },
            onPanResponderRelease: (evt, gestureState) => {
              console.log("-------------------------------")
              console.log("Gesture state is", gestureState.dx)
                if (Math.abs(gestureState.dx) < 5) {
                    this.props.onPress();
                } else if (Math.abs(gestureState.dx) >= 80) {
                      this.props.navigation.push("Schedule", {
                      title: this.props.gyms[this.props.gymKey].name,
                      passProps: {gym: this.props.gyms[this.props.gymKey]}
                    });

                }

              }
            });
         }
      
        allowSingleClicksThrough = (evt, gestureState) => {
          return true;
        }

        render() {
            return (
              <View {...this._panResponder.panHandlers}>
                {this.props.children}
              </View>
            )
        }
            
      
}

export default GymhopTouchable;