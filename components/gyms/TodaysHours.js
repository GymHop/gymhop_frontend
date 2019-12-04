import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { renderHoursString } from '../utils/timeUtils';


class TodaysHours extends Component {

  constructor(props) {
    super(props);
    this.week = ["Sunday", "Monday", "Tuesday", "Wednesday",
                 "Thursday", "Friday", "Saturday"]
  }

  getTodaysHours = (hours) => {
    // returns an arr of hours for today
    // empty arr if we cant find any
    let today = this.week[new Date().getDay()];
    let filtered = hours.filter((hour) => {
      return hour.weekday === today;
    });
    return filtered;
  }

  render() {
    var todaysHours = this.getTodaysHours(this.props.hours);
    return (
      <View style={styles.todaysHours}>
        <Icon name="access-time" size={16} style={styles.timeIcon} />
        <Text>{renderHoursString(todaysHours)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todaysHours: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
    timeIcon: {
      marginRight: 1
    }

})

TodaysHours.defaultProps = {
  hours: []
}

export default TodaysHours
