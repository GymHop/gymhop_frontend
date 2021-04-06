import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, LayoutAnimation,
  Vibration, Image} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../actions/checkinActions';
import * as GymActionCreators from '../actions/gymActions';

import Layout from '../constants/Layout';
import {SliderBox} from 'react-native-image-slider-box';
import GymSchedule from '../components/gyms/Schedule';
import OpenOrClosedRightNow from '../components/gyms/OpenOrClosedRightNow';

import Colors from '../constants/Colors';


class CheckInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
    constructor(props){
        super(props);
        this.checkedIn = false;
        this.state = {
          lastCheckInTime: null,
          lastCheckInUrl: null,
          region: {
            latitude: 40.7934,
            longitude: -73.4151,
          },
        }

        this.renderButton = this.renderButton.bind(this);
    }
    
    componentDidMount() {
      console.log(this.props.gyms[0].distance)
    }

    renderButton() {
        Geolocation.getCurrentPosition((pos) => {
            var tempRegion = {...this.state.region};
            var crd = pos.coords;
            tempRegion.latitude = crd.latitude;
            tempRegion.longitude = crd.longitude;
    
            this.setState({region: tempRegion});
          })

        let gymPhotos = this.props.gyms[0].photos.map(a => a.url)

        if (this.props.gyms[0].distance < 0.113636) {   /* USE THIS ONE FR */
         // if (this.props.gyms[0].distance < 10.113636) { /* USE THIS ONE WHEN TESTING GYM 33 FROM YOUR HOUSE */
          return(
            <>
              <View style={styles.imageContainer}>
                <View style={styles.imageContainer1}>
                  <Image
                    source={require('../assets/images/gymhop.png')}
                    style={styles.brandLogo}
                    resizeMode='contain'
                  />
                </View>
              </View>
              <View style={styles.container}>
                <View style={styles.gymContainerPic}> 
                  {/* <Image source={{uri: gymPhotos[0]}} style={styles.containerPic} /> */}
                  <SliderBox images={gymPhotos} style={styles.gymLeadPhoto} circleLoop disableOnPress/>
                </View>
              </View>

              
              <View style={styles.buttonContainer}>
                <View style={styles.gymImageContainer}>
                  {/* <Image source={{uri: this.props.gyms[0].lead_photo}} style={styles.logoPic} /> */}
                  <View>
                    <Text style={{paddingLeft: '3%', paddingRight: '3%', color: '#000', fontSize: 24, fontWeight: 'bold'}}>{this.props.gyms[0].name}</Text>
                    {/* <Text style={{paddingTop: '1%', paddingLeft: '3%', paddingRight: '3%', color: '#000', fontSize: 16}}>{this.props.gyms[0].amenities}</Text>*/}                 
                  </View>
                </View>
                <View style={styles.ButtonContainer2}>
                  <View style={{flexDirection: 'row', padding: '5%'}}><Text>{this.props.gyms[0].name} is currently {<OpenOrClosedRightNow hours={this.props.gyms[0].hours_enhanced} />}</Text></View>
                  <GymSchedule gym={this.props.gyms[0]} />
                  <TouchableOpacity 
                      onPress={this.handleCheckIn}
                      style={styles.Button}
                  >
                    <Text style={styles.buttonText}>Check In!</Text>
                  </TouchableOpacity>
                </View>
              </View>
              </>
          )
        } else {
          return (
          <View>
            <View style={styles.imageContainer}>
                <View style={styles.imageContainer1}>
                  <Image
                    source={require('../assets/images/gymhop.png')}
                    style={styles.brandLogo}
                    resizeMode='contain'
                  />
                </View>
              </View>
              <View style={styles.failContainer}>
                <Text style={{fontWeight: "bold", fontSize: 28, color: '#000', paddingBottom: '10%'}}>Your closest gym is</Text> 
                <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: '10%', padding: '5%'}}>
                  <Image source={{uri: this.props.gyms[0].lead_photo}} style={{height: 200, width: 200, borderRadius: 25}}/>
                </View>
                <Text style={{fontWeight: "bold", fontSize: 18, color: '#000', paddingBottom: '10%'}}>Move within 200 yards to check in!</Text>
                <View style={{flexDirection: 'row', padding: '5%'}}><Text>{this.props.gyms[0].name} is currently {<OpenOrClosedRightNow hours={this.props.gyms[0].hours_enhanced} />}</Text></View>
              </View>
            </View>
          )
        }

    }

    handleCheckIn = result =>  {
      let resetDateTime;
        resetDateTime = new Date(Date.now() - (1000*1800)); // 30 mins
      if (this.props.gyms[0].code !== this.state.lastCheckInUrl || this.state.lastCheckInTime < resetDateTime) {
        LayoutAnimation.spring();
        Vibration.vibrate([100, 100, 100])
        console.log("Checked In!");

        var data = {
          code: this.props.gyms[0].code
        }
        console.log("sending below to server");
        this.props.Actions.checkinUser(this.props.token, data);
        this.checkedIn = true;
        }
        let lastCheckInTime;
        this.setState({ lastCheckInUrl: data, lastCheckInTime: Date.now()}); // reset lastScannedUrl to allow for another scan

    }

    componentDidUpdate(prevProps, prevState) {
      if ((Object.keys(this.props.checkin).length > 0 || Object.keys(this.props.errors).length > 0) && this.checkedIn) {
        this.props.navigation.push("PostCheckIn", {resetScanned: () => {
          this.setState({lastCheckInUrl:null, lastCheckInTime:null});
  
        }});
        this.checkedIn = false;
        // pass back navigation works but then scanning again is blocked.
        // i believe it is because my passed resetScan fn is not being called even though it is explicitly called
      }
    }

    render() {
        return this.renderButton()
    }
}

const styles = StyleSheet.create({
  gymLeadPhoto: {
    height: '100%',
    width: Layout.window.width
  },
  failContainer: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%'
  },
  imageContainer: {

  },
    imageContainer1: {
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
        backgroundColor: Colors.tabBar,
        justifyContent: 'center',
        alignItems: 'center'
      },
      brandLogo: {
      backgroundColor: Colors.tabBar,
      width: '35%',
      height: Layout.noStatusBarHeight * .03,
    },
  container: {
    display: 'flex',
    backgroundColor: 'white',
    height: Layout.window.height * .3,
    width: '100%',
  },
    gymContainerPic: {
      flex: 1,
      width: '100%',
    },
      containerPic: {
      },

  buttonContainer: {
        flex: 1,
        backgroundColor: 'white',
  },
    gymImageContainer: {    
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 8,

    },
      logoPic: {
          width: Layout.window.width * .4,
          height: '100%',
          // Layout.window.width * .45
          // borderWidth: 1,
          // borderColor: '#000'
      },
      ButtonContainer2: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '5%'
      },  
        Button: {
          height: 150,
          width: 250,
          backgroundColor: '#4BB543',
          borderColor: '#000',
          borderWidth: 2,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
        },
          buttonText: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#000'
          }
})


function mapStateToProps(state) {
    return {
      gyms: state.gyms.gyms,
      pending: state.checkin.pending,
      checkin: state.checkin.checkin,
      errors: state.checkin.errors,
      token: state.user.token
    }
  }
  
  function mapDispatchToProps(dispatch){
    return {
      Actions: bindActionCreators(ActionCreators, dispatch),
      GymActions: bindActionCreators(GymActionCreators, dispatch)
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(CheckInScreen);