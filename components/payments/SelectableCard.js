import React, { Component } from 'react';

import { View, Text, StyleSheet,
         TouchableOpacity, Image, Animated } from 'react-native';
import Layout from '../../constants/Layout';

class SelectableCard extends Component {
  constructor(props) {
    super(props);
    this.animatedTopValue = new Animated.Value(10);
  }

  animateSelected = () => {
    console.log("animateSelected");
    Animated.spring(this.animatedTopValue, {
      toValue: 40
    }).start()
  }
  animateUnselect = () => {
    console.log("animateUnselect");
    Animated.spring(this.animatedTopValue, {
      toValue: 10
    }).start()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected != this.props.selected) {
      if (this.props.selected) {
        this.animateSelected()
      } else {
        this.animateUnselect()
      }
    }
  }

  getDateStr = (date) => {
    var mm = date.getMonth() + 1;
    var dd = date.getDate();

    return [(mm>9 ? '' : '0') + mm,
            "/",
            (dd>9 ? '' : '0') + dd,
            "/",
            (date.getFullYear() + "").slice(2),
           ].join('');
   };

  getAutoRenewDate = (period) => {
    var today = new Date();
    switch (period) {
      case "month":
        var nextMonth = new Date(today.getFullYear(), today.getMonth()+1, today.getDate());
        return this.getDateStr(nextMonth);
      case "week":
        var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
        return this.getDateStr(nextweek);
      default:
    }
  }

  render() {
    let animatedTop = this.animatedTopValue;
    let animatedColor = this.animatedTopValue.interpolate({
        inputRange: [0, 40],
       outputRange: ['#F2F2F2', '#B3D6FF']
    });

    return (
      <Animated.View style={[{backgroundColor: this.props.background, top: animatedTop}, styles.container]}>
        <TouchableOpacity onPress={this.props.onSelect} style={styles.touchableContainer}>
              {this.props.icon}
              <Text style={styles.titleText}>{this.props.title}</Text>
              <Text style={styles.subTitle}>{this.props.price}/{this.props.period}</Text>
              <Text>Expires: {this.getAutoRenewDate(this.props.period)}</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: Layout.window.width * .8 / 2,
    marginHorizontal: Layout.window.width *.01,
    padding: Layout.window.width *.03,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    color: "#F2F2F2"
  },
  touchableContainer: {
    flex: 1
  }
})

export default SelectableCard
