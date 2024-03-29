  import React from 'react';

import { View, Text, Image, StyleSheet, BackHandler, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';

import { dateFormatter } from '../utils/datetime';
import { showMessage, hideMessage } from "react-native-flash-message";

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

import { string } from 'prop-types';
// import ErrorBar from '../components/errorBar/errorBar';

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

  static navigationOptions = {
      title: null,
      headerBackground: (
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: Colors.tabBar,
          marginBottom: 40
        }}>
          <Image
            source={require('../assets/images/gymhop.png')}
            style={{
              width: '60%',
              height: 44
            }}
            resizeMode='contain'
          />
        </View>
      ),
  };

  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      let checkin_failure = Object.keys(this.props.errors).length ? true : false;

      // if (checkin_failure == false) {
      //   showMessage({
      //     message: "Checked In!",
      //     type: "info",
      //     backgroundColor: "#00FF00",
      //     flex: "1",
      //     justifyContent: "center",
      //     fontSize: "18"
      //   });
      // }
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

  handleBackPress = () => {
     const { params } = this.props.navigation.state;
     params.resetScanned();
     this.props.navigation.goBack(null);
     return true;
 }

 getTier(num) {
   switch (num) {
     case 1:
       tierType = "Default";
       break;
     case 2:
       tierType = "Trial Member";
       break;
     case 3:
       tierType = "No tier, Please upgrade your account.";
       break;
     case 4:
       tierType = "Budget tier @40/month";
       break;
     case 5:
       tierType = "No tier, Please upgrade your account.";
       break;
     case 6:
       tierType = "No tier, Please upgrade your account.";
       break;
     case 7:
       tierType = "No tier, Please upgrade your account.";
       break;
     case 8:
       tierType = "Premium tier @80/month"
       break;
     default:
         tierType = "No tier, Please upgrade your account."
   }
 }



  render() {
    if (Object.keys(this.props.errors).length) {
      console.log(this.props.errors);
    }
    let checkin_failure = Object.keys(this.props.errors).length ? true : false;

    return (
      <View style={{flex: 1, height: '100%', backgroundColor: !checkin_failure ? '#32cd32' : 'red'}}>
        {/* <ErrorBar payment_tier={this.props.userProfile.payment_tier}/> */}
        <View style={styles.heading}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.checkinImg}
              source={{ uri: this.props.userProfile.picture_url }}
            />
          </View>
          <View style={styles.nameHolder}>
            <Text style={styles.headingFirstName}>{this.props.userProfile.first_name} {this.props.userProfile.last_name}</Text>
            <Text style={{fontSize: 24}}>{this.props.gyms[0].name}</Text>
            <Text style={styles.headingTier}>{this.getTier(this.props.userProfile.payment_tier)}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.checkinTextContainer}>
            <Text style={styles.checkinText}>{!checkin_failure ? "Check in Complete!" : this.props.errors.user}</Text>
            {!checkin_failure ? (<View style={styles.datetimeContainer}>
              <Text style={styles.checkinSubtext} >{dateFormatter(this.props.checkin.when, "date")}</Text>
              <Text style={styles.checkinSubtext}>{dateFormatter(this.props.checkin.when, "time")}</Text>
            </View>) : null}
          </View>
          <View style={styles.checkmarkContainer}>
            <Image
              source={!checkin_failure ? require('../assets/images/whitecheck.png') : require('../assets/images/x-icon-vector-27.jpg')}
              style={styles.checkmark}
              resizeMode='contain'
            />
          </View>
        </View>
      </View>
    )


  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },

  // errorBar: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: 10,
  //   backgroundColor: 'red',
  //   color: 'white'
  // },
  heading: {
    flex: .7,
    paddingTop: 15,
    width: Layout.window.width,
  },
    imgContainer: {
      flex: 2,
      display: 'flex',
      flexDirection: "row",
      justifyContent: "center",
      padding: 8
    },
      checkinImg: {
        height: 160,
        width: 160,
        borderRadius: 50,
        padding: 5,
        borderColor: 'black',
        borderWidth: 1
      },
    nameHolder: {
      flex: 1,
      display: "flex",
      alignItems: "center"
    },
      headingFirstName: {
        fontSize: 32,
      },
      headingTier: {
        fontSize: 19,
        padding: 8,
        textAlign: "center"

      },
  body: {
    flex: .5,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
    checkinTextContainer: {
      flexDirection: "column"
    },
    datetimeContainer: {
      display: "flex",
      width: "60%",
      flexDirection: "row",
      justifyContent: "space-around"
    },
      checkinSubtext: {
        fontSize: 21
      },
    checkinText: {
      textAlign: "center",
      fontSize:29,
      fontWeight: "bold"
    },
    checkmarkContainer: {
    },
      checkmark: {
        width: Layout.window.height*2/9,
        height: Layout.window.height/9,
      },

  whiteText: {
    color: "white"
  }
});

function mapStateToProps(state){
  return {
    checkin: state.checkin.checkin,
    userProfile: state.user.details,
    errors: state.checkin.errors,
    gyms: state.gyms.gyms,
  }
}

export default connect(mapStateToProps)(PostCheckIn)
