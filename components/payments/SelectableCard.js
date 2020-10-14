import React, { Component } from 'react';

import { View, Text, StyleSheet,
         TouchableOpacity, Image, Animated } from 'react-native';
import Layout from '../../constants/Layout';

class SelectableCard extends Component {
  constructor(props) {
    super(props);
    this.animatedTopValue = new Animated.Value(0);
  }

  animateSelected = () => {
    console.log("animateSelected");
    Animated.spring(this.animatedTopValue, {
      toValue: 30
    }).start()
  }
  animateUnselect = () => {
    console.log("animateUnselect");
    Animated.spring(this.animatedTopValue, {
      toValue: 0
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
        var nextMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
        return this.getDateStr(nextMonth);
      case "week":
        var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
        return this.getDateStr(nextweek);
      default:
    }
  }

  render() {
    let animatedTop = this.animatedTopValue;

    return (
      <Animated.View 
        style={[{backgroundColor: this.props.background, top: animatedTop}, styles.container,]}>
        <TouchableOpacity onPress={this.props.onSelect}>
            <Text style={styles.titleText}>{this.props.title}</Text>
            <Text style={styles.subTitle}>{this.props.chargeInfoText}{this.getAutoRenewDate(this.props.period)}</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width * .8 / 2,
    marginHorizontal: Layout.window.width *.01,
    paddingHorizontal: Layout.window.width *.01,
    borderRadius: 8,
    height: 150,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  touchableContainer: {
    borderWidth: 1,
    height: 160,
  },
    titleText: {
      fontSize: 24,
      textAlign: "center",
      marginTop: 10
    },
    subTitle: {
      textAlign: "center",
    }

})

export default SelectableCard
