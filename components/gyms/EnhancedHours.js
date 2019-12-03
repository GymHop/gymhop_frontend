import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native'

import { militaryToAMPM } from '../utils/timeUtils';

import Icon from 'react-native-vector-icons/Ionicons';

class EnhancedHours extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardOpen: false
    }

    this.week = ["Sunday", "Monday", "Tuesday", "Wednesday",
                 "Thursday", "Friday", "Saturday"]
  }

  toggleHours = () => { this.setState({cardOpen: !this.state.cardOpen}) }

  getTodaysHours = (hours) => {
    // returns an arr of hours for today
    // empty arr if we cant find any
    let today = this.week[new Date().getDay()];
    let filtered = hours.filter((hour) => {
      return hour.weekday === today;
    });
    return filtered;
  }

  renderHoursByDay = (hours) => {

    let hoursByDay = hours.reduce((acc, hour) => {
      if (acc[hour.weekday] === undefined) {
        acc[hour.weekday] = [hour];
      } else {
        acc[hour.weekday].push(hour);
      }
      return acc;
    }, {});

    return (
      <View style={styles.hoursByDayContainer}>
        {Object.keys(hoursByDay).map((day) => {
          return (
            <View style={styles.dayContainer}>
              <Text>{day}: {this.renderHoursString(hoursByDay[day])}</Text>
            </View>
          )
        })}
      </View>
    );
  }

  renderHoursString = (hours) => {
    return hours.reduce((acc, hour) => {
      let opening = militaryToAMPM(hour.from_hour);
      let closing = militaryToAMPM(hour.to_hour);
      return acc + ` ${opening}-${closing},`
    }, "").replace(/(^,)|(,$)/g, "");
  }

  renderTodaysHours = (hours) => {
    return (
      <View style={styles.todaysHours}>
        <Icon name="ios-time" size={12} style={styles.timeIcon} />
        <Text>{this.renderHoursString(hours)}</Text>
      </View>
    );
  }

  render() {
    let {hours, hoursString} = this.props;

    if (hours.length === 0) {
      return (
        <View style={styles.simpleHoursContainer}>
          <Text>Hours: {hours}</Text>
        </View>
      )
    } else {
      var todaysHours = this.getTodaysHours(hours);
      var todaysHours_renderable = this.renderTodaysHours(todaysHours);
      var hoursByDay_renderable = this.renderHoursByDay(hours);

      if (todaysHours.length) {
        return (
          <View style={styles.hoursContainer}>
            {todaysHours_renderable}
            {hoursByDay_renderable}
          </View>
        )
      } else {
        return (
          <View style={styles.hoursContainer}>
            {hoursByDay_renderable}
          </View>
        )
      }
    }
  }
}

const styles = StyleSheet.create({
  simpleHoursContainer: {

  },
  hoursContainer: {
    marginTop: 12,
  },
  todaysHours: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7
  },
    timeIcon: {
      marginRight: 1
    }
})

export default EnhancedHours
