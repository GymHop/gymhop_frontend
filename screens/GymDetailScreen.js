import React, { Component } from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import GymDetailContainer from '../components/gyms/GymDetailContainer'

class GymDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Available Gyms',
    backButtonTitle: ''
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.scrollView}>
            <GymDetailContainer gym={this.props.selectedGym} key={this.props.selectedGym.id}/>
          </View>        
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

})

function mapStateToProps(state) {
  return {
    selectedGym: state.gyms.selectedGym
  }
}

export default connect(mapStateToProps)(GymDetailScreen)
