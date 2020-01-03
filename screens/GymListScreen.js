import React, { Component } from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GymTile from '../components/gyms/GymTile';
import { connect } from 'react-redux';

class GymListScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
     title: 'Our Member Gyms',
     backButtonTitle: ''
   };


  render() {
    return (
      <ScrollView>
        {this.props.gyms.map((gym) => {
          return <GymTile gym={gym} />
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  titleText: {
    marginVertical: 10,
    fontSize: 24,
    textAlign: "center"
  }
})

function mapStateToProps(state) {
  return {
    gyms: state.gyms.gyms
  }
}

export default connect(mapStateToProps)(GymListScreen)
