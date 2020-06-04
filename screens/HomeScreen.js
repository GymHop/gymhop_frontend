import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';

import {request, PERMISSIONS} from 'react-native-permissions';


import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import PullUpMenu from '../components/PullUpMenu';
import GymTile from '../components/gyms/GymTile';
import GymDetail from '../components/gyms/GymDetail';
import GymMap from '../components/gyms/Map';
import GymDetailContainer from '../components/gyms/GymDetailContainer';
import GymListBtn from '../components/gyms/ViewGymListBtn';

import * as ActionCreators from '../actions/gymActions';

import Layout from '../constants/Layout';

import Colors from "../constants/Colors";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      hasLocationPermission: null,
    }
    this._renderHeader = this._renderHeader.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this._updateSections = this._updateSections.bind(this);
    this.getGymIdxFromActiveSections = this.getGymIdxFromActiveSections.bind(this);
    // this._requestLocationPermission = this._requestLocationPermission.bind(this);
    // this.requestLocationPermission = this.requestLocationPermission.bind(this);
    // this.getLocation = this.getLocation.bind(this);
  }

  async componentDidMount() {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
      if (result === "granted") {
        this.setState({hasLocationPermission: true})
        if (this.props.gyms.length === 0) {
          Geolocation.getCurrentPosition((pos) => {
            var crd = pos.coords;
            let coords = {
              latitude: crd.latitude,
              longitude: crd.longitude
            }
              // get location aware list of gyms
              this.props.Actions.getGyms(this.props.token, coords);
            },
            (err) => {
              // error getting location, just get all gyms
              this.props.Actions.getGyms(this.props.token);
            }
    
          )
        }
      } else {
        console.log('why rory')
      }
    }).catch((err) => {
      console.log(err)
      }) 
  }
  

  _renderHeader(section, index) {
    // header of expanded section
    return (
          <GymTile key={index} gym={section}/>
    )
  }
  _renderContent(section, index, isActive, sections) {
    // content when expanded
    return <GymDetail gym={section} />
  }


  _updateSections(activeSections) {
    this.setState({activeSections})
  }

  getGymIdxFromActiveSections() {
    //this works only because
    //because Accordion can only have one section open at a time
    // if you want multiple sections open this will break the map
    if (this.state.activeSections.length == 0) {
      return null;
    }
    return this.state.activeSections[0]
  }

  render() {

    if (this.props.pending) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading nearby gyms...</Text>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )
    }


      return (
        <View style={styles.container}>
            <View style={styles.mapsContainer}>
                <GymMap gyms={this.props.gyms}
                        selectedGymIdx={this.getGymIdxFromActiveSections()}
                />
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/gymhop.png')}
                style={styles.brandLogo}
                resizeMode='contain'
              />
            </View>
            <GymListBtn />
            <PullUpMenu>
              <GymDetailContainer gym={this.props.selectedGym} />
            </PullUpMenu>
        </View>
      );
  }
}

//
// <ScrollView
//   style={styles.contentContainer}
//   scrollEnabled={true}
//   // refreshControl={
//   //   <RefreshControl
//   //     refreshing={this.state.refreshing}
//   //     onRefresh={this._onRefresh}
//   //   /> }
//   >
//
//     <View style={styles.accordianContainer}>
//       {this.props.gyms.map((gym, idx) => {
//         return this._renderHeader(gym, idx)
//       })}
//     </View>
// </ScrollView>

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
    loadingText: {
      fontSize: 26,
      textAlign: "center",
      marginBottom:15
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
    imageContainer: {
    ...Platform.select({
      ios: {
        zIndex: 999,
        height: Layout.noStatusBarHeight * .04
      },
      android: {
        elevation: 30,
        paddingVertical: 6
      },
    }),
      backgroundColor: '#ffd1dc',
      justifyContent: 'center',
      alignItems: 'center'
    },
      brandLogo: {
      backgroundColor: '#ffd1dc',
      width: '35%',
      height: Layout.noStatusBarHeight * .03,
    },
    mapsContainer: {
      position: "absolute",
      zIndex: 1,
      top: 0,
      bottom: 0,
      height: ( Layout.noStatusBarHeight)* 1,
      width: (Layout.window.width),
    },
    contentContainer: {
      flex: 1,
    },
      accordianContainer: {
        // height: ( Layout.noStatusBarHeight)* .9,
        height: '100%',
        width: Layout.window.width,
        // marginBottom: Layout.window.height,
      }
});

function mapStateToProps(state) {
  return {
    gyms: state.gyms.gyms,
    selectedGym: state.gyms.selectedGym,
    pending: state.gyms.pending,
    error: state.gyms.error,
    token: state.user.token,
    payment_tier: state.user.details.payment_tier
  }
}
function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(ActionCreators, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
