import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { styles } from '../../styles/gymOwner/stats';
import * as ActionCreators from '../../actions/gymOwnerActions/stats.js';

class StatsScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>Stats Screen</Text>
      </View>
    )
  }
}
export default StatsScreen
