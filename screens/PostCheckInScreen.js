import React from 'react';

import { View, Text, Image, StyleSheet, BackHandler } from 'react-native';
import { connect } from 'react-redux';

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

    onNavigatorEvent = (event) => {
            if (event.id == 'backPress') {
                alert('back');
            }
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
        <View style={styles.imageContainer}>
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
            <Text>Checkin Complete!</Text>
            <Text>{this.props.checkin.when}</Text>
          </View>
          <View>
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
  imageContainer: {
    flex: .16,
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
    flex: .3,
    justifyContent: "space-around",
  },
    imgContainer: {
      flex:.6,
      flexDirection: "row",
      justifyContent: "center",
      marginHorizontal: 10
    },
      checkinImg: {
        borderRadius: 700,
        width: "100%",
        height: "100%"
      },
    nameHolder: {
      flex: .4,
      alignItems: "center"
    },
      headingFirstName: {
        fontSize: 32,
      },
      headingTier: {
        fontSize: 19,
      },
  body: {
    flex: .54,
    flexDirection: "column",
    // justifyContent: "space-around",
    alignItems: "center"
  },
    checkmark: {
      width: 340,
      height: 165,
      margin: 10
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
