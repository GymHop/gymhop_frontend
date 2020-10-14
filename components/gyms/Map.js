import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

import { selectGym } from '../../actions/gymActions';

import Layout from '../../constants/Layout';
import MapMarker from './MapMarker'

class GymMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      region: {
        latitude: 40.7934,
        longitude: -73.4151,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      canUseGeolocation: false,
      selectedGymIdx: this.props.selectedGymIdx
    }
  }

  componentDidMount(){
    //
    // const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
    //
    // if (granted) {
    //   console.log( "You can use the ACCESS_FINE_LOCATION" )
    // }
    // else {
    //   console.log( "ACCESS_FINE_LOCATION permission denied" )
    // }
    Geolocation.getCurrentPosition((pos) => {
        var tempRegion = {...this.state.region};
        var crd = pos.coords;
        tempRegion.latitude = crd.latitude;
        tempRegion.longitude = crd.longitude;

        this.setState({region: tempRegion});
      })
  }

  animateToSelectedGym = () => {
    var camera = {...this._map.getCamera()}
    let selectedGym = this.props.gyms[this.props.selectedGymIdx];
    camera.center = {
      latitude: parseFloat(selectedGym.latitude),
      longitude: parseFloat(selectedGym.longitude),
    }
    this._map.animateCamera(camera);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedGymIdx != null && this.props.selectedGymIdx != prevProps.selectedGymIdx) {
      this.animateToSelectedGym();
    }
  }

  handleRegionChange = (region) => {
    this.setState({region})
  }


  render() {
    let { gyms } = this.props;

    return (<MapView
              ref={component => this._map = component}
              style={styles.map}
              region={this.state.region}
              onRegionChange={() => this.handleRegionChange()}
              showsUserLocation={true}
              animateToRegion={() => animateToHighlightGym()}>
                  {gyms.map(gym => {
                    let latlng = {
                      latitude: parseFloat(gym.latitude),
                      longitude: parseFloat(gym.longitude)
                    }
                      if (gym.price === 4) {
                          return (
                              <Marker
                              key={gym.id}
                              coordinate={latlng}
                              title={gym.name}
                              image={require('../../assets/images/location-pin.png')}
                              onPress={(coord, position) => {
                                  this.props.selectGym(gym);
                              }}
                              />
                          )
                      } else {
                          return (
                              <Marker
                              key={gym.id}
                              coordinate={latlng}
                              title={gym.name}
                              image={require('../../assets/images/location-pingold.png')}
                              onPress={(coord, position) => {
                                  this.props.selectGym(gym);
                              }}
                              />
                          )
                      }
                  })} 
    </MapView>)
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height:  ( Layout.noStatusBarHeight)* .35,
    width: (Layout.window.width)
  },
})

function mapDispatchToProps(dispatch) {
  return {
    selectGym: (gym) => dispatch(selectGym(gym))
  }
}

export default connect(null, mapDispatchToProps)(GymMap)
