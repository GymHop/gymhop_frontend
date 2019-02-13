import React from 'react';

import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { connect } from 'react-redux';

class PostCheckIn extends React.Component {

  constructor(props) {
    super(props);
    this.props.navigation.addListener(
      'didBlur',
      payload => {
        this.props.navigation.state.params.resetScanned();
      }
    )
  }

  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    onNavigatorEvent = (event) => {
            if (event.id == 'backPress') {
                alert('back');
            }
    }


  handleBackPress = () => {
     const { params } = this.props.navigation.state;
     params.resetScanned();
     this.props.navigation.goBack(null);
     return true;
 }

  render() {
    return (
      <View>
        <Text>PostCheckIn</Text>
        <Text>{this.props.userProfile.first_name}</Text>
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    checkin: state.checkin,
    userProfile: state.user.details
  }
}

export default connect(mapStateToProps)(PostCheckIn)
