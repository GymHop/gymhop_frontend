import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Layout from '../../constants/Layout';

export default class GymMap extends Component {
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
      navigator.geolocation.getCurrentPosition((pos) => {
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
          return (
            <Marker
              key={gym.id}
              coordinate={latlng}
              title={gym.name}
              />
            )
          }
        )}
  </MapView>)
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: ( Layout.window.height - StatusBar.currentHeight)* .35,
    width: (Layout.window.width),}
})
