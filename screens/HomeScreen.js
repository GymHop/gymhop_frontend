import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions
} from 'react-native';
import {SafeAreaView} from 'react-navigation';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Accordion from 'react-native-collapsible/Accordion';

import GymTile from '../components/gyms/GymTile';
import GymDetail from '../components/gyms/GymDetail';
import GymMap from '../components/gyms/Map';

import * as ActionCreators from '../actions/gymActions';

import { MonoText } from '../components/StyledText';
import Layout from '../constants/Layout';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      activeSections: []
    }
    this._renderHeader = this._renderHeader.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this._updateSections = this._updateSections.bind(this);
    this.getGymIdxFromActiveSections = this.getGymIdxFromActiveSections.bind(this);
  }

  componentDidMount() {
    if (this.props.gyms.length === 0) {
      navigator.geolocation.getCurrentPosition((pos) => {
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

      );
    }
  }


  _renderHeader(section, index, isActive, sections) {
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
        <View>
          <Text>Loading nearby gyms...</Text>
        </View>
      )
    }


    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/gymHopWhite.png')}
            style={styles.brandLogo}
            resizeMode='contain'
          />
        </View>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.mapsContainer}>
            <GymMap gyms={this.props.gyms}
                    selectedGymIdx={this.getGymIdxFromActiveSections()}
            />
          </View>
          <View style={styles.accordianContainer}>
            <Accordion
              sections={this.props.gyms}
              activeSections={this.state.activeSections}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              onChange={this._updateSections}
              underlayColor={"#ffffff"}
            />
          </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
    imageContainer: {
    ...Platform.select({
      ios: {
        shadowOffset:{  width: 0,  height: 3,  },
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 3,
        zIndex: 999,
        height: Layout.noStatusBarHeight * .04
      },
      android: {
        elevation: 30
      },
    }),
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center'
    },
      brandLogo: {
      backgroundColor: '#000000',
      width: '35%',
      height: Layout.noStatusBarHeight * .03
    },
    contentContainer: {
      flex: 1,

    },
      mapsContainer: {
        flex: 1,
        height: ( Layout.noStatusBarHeight)* .35,
        width: (Layout.window.width),
      },
      accordianContainer: {
        height: ( Layout.noStatusBarHeight)* .65,
        width: Layout.window.width,
        marginBottom: 60,
      }
});

function mapStateToProps(state) {
  return {
    gyms: state.gyms.gyms,
    pending: state.gyms.pending,
    error: state.gyms.error,
    token: state.user.token
  }
}
function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(ActionCreators, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
