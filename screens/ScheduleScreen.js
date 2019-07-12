import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Platform,
  } from 'react-native';

import Layout from '../constants/Layout';

import Colors from "../constants/Colors";

import ImageView from 'react-native-image-view';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import * as ActionCreators from '../actions/gymActions';

class ScheduleScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({visible: true})
  }

  render() {
    if (this.props.pending) {
      return (
        <View>
          <Text>Loading Schedule</Text>
        </View>
      )
    }
    let gym = this.props.navigation.state.params.passProps.gym;
    let schedulePhoto = gym.schedule_photo;

    let images = [{
        source: { uri: schedulePhoto}
      }]

    return (

      <View style={styles.container}>
        <View style={styles.imageContainer}>
                <Image
                  source={require('../assets/images/gymHopWhite.png')}
                  style={styles.brandLogo}
                  resizeMode='contain'
                />
          </View>
        <View style={styles.nameContainer}>
          <Image
            source={{uri: gym.lead_photo}}
            style={styles.gymLeadPhoto}
          />
          <Text style={styles.gymName}>{gym.name}</Text>
        </View>
        <View style={styles.imageContainer2}>
          <TouchableOpacity onPress={this.onClick} style={styles.imageContainer3}>
            <Image
            source={{uri: schedulePhoto}}
            style={styles.schedulePhoto}
            resizeMode='contain'
            />
          </TouchableOpacity>
          <ImageView
            images={images}
            imageIndex={0}
            isVisible={this.state.visible}
            renderFooter={(currentImage) => (<View><Text>{gym.name}</Text></View>)}
            />
        </View>
      </View>
    )
  }
}



function mapStateToProps(state) {
  return {
    gyms: state.gyms.gyms,
    pending: state.gyms.pending,
    token: state.user.token,
  }
}
  function mapDispatchToProps(dispatch) {
    return {
      Actions: bindActionCreators(ActionCreators, dispatch)
    }
  }

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: '#fff',

    },
      imageContainer: {
        flex: .05,
        backgroundColor: 'black',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
          ios: {
            zIndex: 999,
            height: Layout.noStatusBarHeight * .04,
          },
          android: {
            elevation: 30,
            paddingVertical: 6,

          },
        })},
          brandLogo: {
            backgroundColor: '#000000',
            width: '35%',
            height: Layout.noStatusBarHeight * .03,
          },
      nameContainer: {
        flex: .2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.tintColor,
      },
        gymPhotoContainer: {
          width: "23%",
          padding: 8,

        },
          gymLeadPhoto: {
            width: 85,
            height: 85,
            borderRadius: 85 / 2,
            overflow: "hidden",
          },
        gymName: {
          fontSize: 24,
          marginRight: '10%',

        },
      imageContainer2: {
        flex: .8,
        justifyContent: 'center',
        marginBottom: '10%'
        // borderColor: 'red',
        // borderWidth: 1
      },
        imageContainer3: {
          flex: 1,
          height: '100%'
        },
        schedulePhoto: {
          flex: 1
        }
  });

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleScreen);
