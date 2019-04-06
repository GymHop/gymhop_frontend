  import React from 'react';

import { View, Text, Image, StyleSheet, BackHandler, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';

import { dateFormatter } from '../utils/datetime';
import Layout from '../constants/Layout';
import ErrorBar from '../components/errorBar/errorBar';

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
      let checkin_failure = Object.keys(this.props.errors).length ? true : false;

      if (checkin_failure == false) {
        showMessage({
          message: "Checked In!",
          type: "info",
          backgroundColor: "#00FF00",
          flex: "1",
          justifyContent: "center",
          fontSize: "18"
        });
      }
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
       return "Budget Member";
     case 2:
        return "Premium Member"
     default:
       return "No tier. Please upgrade your account in order to access this gym"
   }
 }



  render() {
    if (Object.keys(this.props.errors).length) {
      console.log(this.props.errors);
    }
    let checkin_failure = Object.keys(this.props.errors).length ? true : false;


    return (
      <View style={styles.container}>
        <View style={styles.gymhopLogoImageCntainer}>
          <Image
            source={require('../assets/images/gymHopWhite.png')}
            style={styles.headLogo}
            resizeMode='contain'
          />
        </View>
        <ErrorBar payment_tier={this.props.userProfile.payment_tier}/>
        <View style={styles.heading}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.checkinImg}
              resizeMode='contain'
              source={{ uri: this.props.userProfile.picture_url }}
            />
          </View>
          <View style={styles.nameHolder}>
            <Text style={styles.headingFirstName}>{this.props.userProfile.first_name} {this.props.userProfile.last_name}</Text>
            <Text style={styles.headingTier}>{this.getTier(this.props.userProfile.payment_tier)}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View>
            <Text style={styles.checkinText}>{!checkin_failure ? "Check in Complete!" : "Invalid Checkin"}</Text>
            {!checkin_failure ? (<View style={styles.datetimeContainer}>
              <Text style={styles.checkinSubtext} >{dateFormatter(this.props.checkin.when, "date")}</Text>
              <Text style={styles.checkinSubtext}>{dateFormatter(this.props.checkin.when, "time")}</Text>
            </View>) : null}
          </View>
          <View style={styles.checkmarkContainer}>
            <Image
              source={!checkin_failure ? require('../assets/images/checkmark.png') : require('../assets/images/error.png')}
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
    backgroundColor: 'white'
  },
  gymhopLogoImageCntainer: {
    flex: .10,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: '#000000',
    marginBottom: 7
  },
    headLogo: {
      width: '60%',
      height: 64
    },
  errorBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'red',
    color: 'white'
  },
  heading: {
    flex: .4,
    margin: 0
  },
    imgContainer: {
      display: "flex",
      height:128,
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
    },
      checkinImg: {
        borderRadius: 100,
        height:128,
        width: 128,
      },
    nameHolder: {
      display: "flex",
      alignItems: "center"
    },
      headingFirstName: {
        fontSize: 32,
      },
      headingTier: {
        fontSize: 19,
        padding: 26,
        textAlign: "center"

      },
  body: {
    flex: .34,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
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
      paddingTop: 30
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
    errors: state.checkin.errors
  }
}

export default connect(mapStateToProps)(PostCheckIn)
