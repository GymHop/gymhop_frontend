import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { styles } from '../../styles/gymOwner/stats';
import * as ActionCreators from '../../actions/gymOwnerActions/stats.js';

import CheckinGraph from '../../components/gymOwner/CheckinGraph';
import UniqueCheckins from '../../components/gymOwner/UniqueCheckins';
import Earnings from '../../components/gymOwner/Earnings';
import CheckinList from '../../components/gymOwner/CheckinList';


class StatsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.stats.total_checkins == undefined && !this.props.pending) {
      this.props.Actions.getStatistics(this.props.token);
      console.log('Statistics Arrived Fucker')
    }
  }

  render() {
    let { stats, pending } = this.props;
    if (pending) {
      return (
        <View style={[styles.container, styles.loadingScreen]}>
          <Text style={styles.loadingTextTitle}>Hi {this.props.firstName}</Text>
          <Text style={styles.loadingTextSubtitle}>Loading your stats...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    let { total_checkins,
          for_month_of,
          owed_to_gym,
          total_uniques,
          } = stats;
    var { check_ins } = stats;
    check_ins.sort((a, b) => {
      return new Date(b.when) - new Date(a.when);
      console.log('Fucking Returned')
    });

    return (
      <ScrollView style={styles.container}>
        <View style={styles.monthContainer}>
          <Text style={styles.monthText}>{for_month_of}</Text>
        </View>
        {/*<View styles={styles.checkinGraph}>*/}
        <CheckinGraph
        checkins={stats.check_ins}
        />
        {/*</View>*/}
        <View style={styles.tileRow}>
          <View style={styles.tileElement}>
            <UniqueCheckins num={total_uniques} />
          </View>
          <View style={styles.tileElement}>
            <Earnings currentLiability={owed_to_gym}/>
          </View>
        </View>
        <CheckinList
          checkins={check_ins}
        />
      </ScrollView>
    )
  }
}
function mapStateToProps(state){
  return {
    stats: state.gymOwner.stats,
    pending: state.gymOwner.pending,
    firstName: state.user.details.first_name,
    token: state.user.token
  }
}
function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(ActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen)
