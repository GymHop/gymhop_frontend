import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { styles } from '../../styles/gymOwner/tiles'

class Earnings extends Component {
  constructor(props) {
    super(props);
    this.filterEnum = ["Month", "YTD", "Lifetime"];
    this.state = {
      filterIdx: 0
    }

    this.goToNextStat = this.goToNextStat.bind(this);
    this.getNextLabel = this.getNextLabel.bind(this);
  }

  goToNextStat() {
    // rotate the index for the enum
    if (this.state.filterIdx >= this.filterEnum.length-1) {
      this.setState({filterIdx: 0})
    } else {
      this.setState({filterIdx: this.state.filterIdx + 1})
    }
  }
  getNextLabel() {
    if (this.state.filterIdx >= this.filterEnum.length-1) {
      return this.filterEnum[0];
    } else {
      return this.filterEnum[this.state.filterIdx+1];
    }
  }

  render() {
    var headlineNum;
    console.log(this.filterEnum[this.state.filterIdx]);
    console.log(this.filterEnum[this.state.filterIdx] === "Month");
    switch (this.filterEnum[this.state.filterIdx]) {
      case "Month":
        headlineNum = this.props.currentLiability;
        break;
      default:
        headlineNum = 999;
        break
    }
    let descriptor = this.filterEnum[this.state.filterIdx];


    return (
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.headlineNumber}>{headlineNum}</Text>
          <Text style={styles.descriptor}>{descriptor}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.goToNextStat} style={earningsStyles.nextLabelContainer}>
            <Text>View {this.getNextLabel()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const earningsStyles = StyleSheet.create({
  nextLabelContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});

export default Earnings
