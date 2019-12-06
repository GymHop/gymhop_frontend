import React, { Component } from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import GymDetailContainer from '../components/gyms/GymDetailContainer'

class GymDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <GymDetailContainer gym={this.props.selectedGym} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

function mapStateToProps(state) {
  return {
    selectedGym: state.gyms.selectedGym
  }
}

export default connect(mapStateToProps)(GymDetailScreen)
