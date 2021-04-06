import React from 'react';
import { Marker } from 'react-native-maps';
import { selectGym } from '../../actions/gymActions';
import { connect } from 'react-redux';

const MapMarker = ({gyms}) => {
    return (
    gyms.map(gym => {
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
}))
}

function mapDispatchToProps(dispatch) {
    return {
      selectGym: (gym) => dispatch(selectGym(gym))
    }
  }

export default connect(null, mapDispatchToProps)(MapMarker)