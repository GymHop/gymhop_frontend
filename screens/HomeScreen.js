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
  Dimensions,
  RefreshControl,
  AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-navigation';


import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import Accordion from 'react-native-collapsible/Accordion';

import GymTile from '../components/gyms/GymTile';
import GymDetail from '../components/gyms/GymDetail';
import GymMap from '../components/gyms/Map';
import ErrorBar from '../components/errorBar/errorBar';

import * as ActionCreators from '../actions/gymActions';

import { MonoText } from '../components/StyledText';
import Layout from '../constants/Layout';

import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';

const CopilotView = walkthroughable(View);

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  // static propTypes = {
  //   start: PropTypes.func.isRequired,
  //   copilotEvents: PropTypes.shape({
  //     on: PropTypes.func.isRequired,
  //   }).isRequired,
  // };

  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      copilotDone: null,
      // refreshing: false,
    }
    this._renderHeader = this._renderHeader.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this._updateSections = this._updateSections.bind(this);
    this.getGymIdxFromActiveSections = this.getGymIdxFromActiveSections.bind(this);
    this.handleStepChange = this.handleStepChange.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem("1", (err, result) => {
      if (err) {
      } else {
        if (result == null) {
          console.log("null value recieved", result);
          this.props.copilotEvents.on('stepChange', this.handleStepChange);
          this.props.start();
          this.props.copilotEvents.on('stop', () => {
            // Copilot tutorial finished!
            this.props.copilotEvents.off('stop');
            this.setState({copilotDone: true});
          });
          AsyncStorage.setItem("Home", JSON.stringify({"value":"true"}), (err,result) => {
            console.log("error",err,"result",result);
            });
        } else {
          console.log("result", result);
        }
      }
    });

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

  handleStepChange = (step) => {
    console.log(`Current step is: ${step.name}`);
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

  // _onRefresh = () => {
  //   this.setState({refreshing: true});
  //   if (this.props.gyms.length === 0) {
  //     navigator.geolocation.getCurrentPosition((pos) => {
  //       var crd = pos.coords;
  //       let coords = {
  //         latitude: crd.latitude,
  //         longitude: crd.longitude
  //       }
  //         // get location aware list of gyms
  //           this.props.Actions.getGyms(this.props.token, coords).then(() => {
  //           this.setState({refreshing: false});

  //         });
  //       },
  //       (err) => {
  //         // error getting location, just get all gyms
  //         this.props.Actions.getGyms(this.props.token).then(() => {
  //           this.setState({refreshing: false});
  //         })
  //       }

  //     );
  //   }
    // this.props.copilotEvents.on('stepChange', this.handleStepChange);
    // this.props.start();
  // }



  render() {

    if (this.props.pending) {
      return (
        <View>
          <Text>Loading nearby gyms...</Text>
        </View>
      )
    }

    if (this.state.copilotDone === true) {
      return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
                <Image
                  source={require('../assets/images/gymHopWhite.png')}
                  style={styles.brandLogo}
                  resizeMode='contain'
                />
          </View>
            <View>
              <ErrorBar payment_tier={this.props.payment_tier} />
            </View>
          
            <View style={styles.mapsContainer}>
                <GymMap gyms={this.props.gyms}
                        selectedGymIdx={this.getGymIdxFromActiveSections()}
                />
            </View>
            <ScrollView 
              style={styles.contentContainer}
              // refreshControl={
              //   <RefreshControl
              //     refreshing={this.state.refreshing}
              //     onRefresh={this._onRefresh}
              //   /> }
              >

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


    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/gymHopWhite.png')}
                style={styles.brandLogo}
                resizeMode='contain'
              />
        </View>
        <CopilotStep text="Click here to see our membership options (Opens browser)" order={3} name="Membership">
          <CopilotView>
            <ErrorBar payment_tier={this.props.payment_tier} />
          </CopilotView>
        </CopilotStep>
        
        <CopilotStep text="Welcome to the GymHop App Tutorial! Click Next to continue!" order={1} name="Intro">
          <CopilotView style={styles.mapsContainer}>
              <GymMap gyms={this.props.gyms}
                      selectedGymIdx={this.getGymIdxFromActiveSections()}
              />
          </CopilotView>
        </CopilotStep>
          <ScrollView 
            style={styles.contentContainer}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={this.state.refreshing}
            //     onRefresh={this._onRefresh}
            //   /> }
            >
            <CopilotStep text="This is our list of gyms! Click on a gym to see the location, description, hours, or get directions!" order={2} name="Gyms"> 
              <CopilotView style={styles.accordianContainer}>
                  <Accordion
                    sections={this.props.gyms}
                    activeSections={this.state.activeSections}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={this._updateSections}
                    underlayColor={"#ffffff"}
                  />
              </CopilotView>
            </CopilotStep>
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
        zIndex: 999,
        height: Layout.noStatusBarHeight * .04
      },
      android: {
        elevation: 30,
        paddingVertical: 6
      },
    }),
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center'
    },
      brandLogo: {
      backgroundColor: '#000000',
      width: '35%',
      height: Layout.noStatusBarHeight * .03,
    },
    mapsContainer: {
      flex: .6,
      height: ( Layout.noStatusBarHeight)* .25,
      width: (Layout.window.width),
    },
    contentContainer: {
      flex: 1,
    },
      accordianContainer: {
        height: ( Layout.noStatusBarHeight)* .9,
        width: Layout.window.width,
        marginBottom: Layout.window.height
      }
});

function mapStateToProps(state) {
  return {
    gyms: state.gyms.gyms,
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
export default connect(mapStateToProps, mapDispatchToProps)(copilot( {overlay: 'svg', // or 'view'
animated: true, verticalOffset: 24})(HomeScreen));
