import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


class OpenOrClosedRightNow extends Component {
  constructor(props) {
    super(props);
    this.week = ["Sunday", "Monday", "Tuesday", "Wednesday",
                 "Thursday", "Friday", "Saturday"]
  }

  setDateTime = function(date, str){
      var sp = str.split(':');
      date.setHours(parseInt(sp[0],10));
      date.setMinutes(parseInt(sp[1],10));
      date.setSeconds(parseInt(sp[2],10));
      return date;
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
    var openNow = false;
    var rightNow = new Date();
    for (var hour in todaysHours) {
      let start = this.setDateTime(new Date(), todaysHours[hour].from_hour);
      let end = this.setDateTime(new Date(), todaysHours[hour].to_hour);
      if (rightNow > start.getTime() && rightNow < end.getTime()) {
        openNow = true;
        break;
      }
    }


    return (
      <View style={styles.todaysHours}>
        {
          openNow ?
          <Text style={styles.openText}>Open</Text>
          :
          <Text style={styles.closedText}>Closed</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todaysHours: {
    flexDirection: "row"
  },
  openText: {
    color: "green",
  },
  closedText: {
    color: "red",
  },
})
OpenOrClosedRightNow.defaultProps = {
  hours: []
}

export default OpenOrClosedRightNow
