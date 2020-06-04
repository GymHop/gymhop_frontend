import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native'

import { renderHoursString } from '../utils/timeUtils';

import Icon from 'react-native-vector-icons/Ionicons';

class EnhancedHours extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardOpen: false
    }


  }

  toggleHours = () => { this.setState({cardOpen: !this.state.cardOpen}) }

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
            <View style={styles.dayContainer} key={day+"__enhanced_hours"}>
              <View style={styles.dayItem}>
                <Text style={styles.textColor}>{day}:</Text>
              </View>
              <View style={styles.dayItem}>
                <Text style={styles.textColor}>{renderHoursString(hoursByDay[day])}</Text>
              </View>
            </View>
          )
        })}
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
      var hoursByDay_renderable = this.renderHoursByDay(hours);
      return (
        <View style={styles.hoursContainer}>
          <Text style={{marginBottom: 3,fontWeight: "bold", color: 'black'}}>Hours: </Text>
          {hoursByDay_renderable}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  simpleHoursContainer: {

  },
  hoursContainer: {
    marginTop: 12,
  },
  dayContainer: {
    flexDirection: "row"
  },
    dayItem: {
      flex: 1,
    },
    textColor: {
      color: 'black'
    }

})

export default EnhancedHours
