import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ImageView from 'react-native-image-view';
import Layout from '../../constants/Layout';
import Icon from 'react-native-vector-icons/Ionicons'

class GymSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }



  render() {
    let gym = this.props.gym;
    let schedulePhoto = gym.schedule_photo;

    let images = [{
        source: { uri: schedulePhoto},
        title: "Schedule"
      }]

    return (
      <View style={styles.container}>
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity
            onPress={() => {this.setState({visible: true})}}
            style={styles.lightGrayBtn}>
            <Icon name="ios-calendar" size={18} color="#000"/>
            <Text style={styles.lightGrayBtnText}>Class Schedule</Text>
          </TouchableOpacity>
        </View>

        <ImageView
          images={images}
          imageIndex={0}
          isVisible={this.state.visible}
          onClose={() => this.setState({visible: false})}
          isSwipeCloseEnabled={true}
          renderFooter={(currentImage) => (<View><Text>{this.props.gym.name}</Text></View>)}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  lightGrayBtn: {
    width: Layout.window.width / 1.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 25
  },
    lightGrayBtnText: {
      fontSize: 16,
      color: "#000",
      marginLeft: 10
    },
})

export default GymSchedule
