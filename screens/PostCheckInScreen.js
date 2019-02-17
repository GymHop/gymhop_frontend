import React from 'react';

import { View, Text, Image, StyleSheet, BackHandler } from 'react-native';
import { connect } from 'react-redux';

import { dateFormatter } from '../utils/datetime';

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
       return "Budget Tier";
     case 2:
        return "Primo memberino"
     default:
       return "No tier :("
   }
 }



  render() {
    console.log(this.props.userProfile.picture_url);
    return (
      <View style={styles.container}>
        <View style={styles.gymhopLogoImageCntainer}>
          <Image
            source={require('../assets/images/gymHopWhite.png')}
            style={styles.headLogo}
            resizeMode='contain'
          />
        </View>
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
            <Text style={styles.checkinText}>Check in Complete!</Text>
            <View style={styles.datetimeContainer}>
              <Text style={styles.checkinSubtext} >{dateFormatter(this.props.checkin.when, "date")}</Text>
              <Text style={styles.checkinSubtext}>{dateFormatter(this.props.checkin.when, "time")}</Text>
            </View>
          </View>
          <View style={styles.checkmarkContainer}>
            <Image
              source={require('../assets/images/checkmark.png')}
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
    flex: .13,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: '#000000',
    marginBottom: 7
  },
  headLogo: {
    width: '92%',
    height: 64
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
      paddingTop: 100
    },
      checkmark: {
        width: 255,
        height: 124,
      },

  whiteText: {
    color: "white"
  }
});

function mapStateToProps(state){
  return {
    checkin: state.checkin.checkin,
    userProfile: state.user.details
  }
}

export default connect(mapStateToProps)(PostCheckIn)
