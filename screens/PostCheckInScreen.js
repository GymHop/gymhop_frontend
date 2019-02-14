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
        <View style={styles.heading}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.checkinImg}
              resizeMode='contain'
              source={{ uri: this.props.userProfile.picture_url }}
            />
          </View>
          <View style={styles.nameHolder}>
            <Text style={styles.headingFirstName}>{this.props.userProfile.first_name}</Text>
            <Text     transform={[{ translateX: 9 }]} style={styles.headingLastName}>{this.props.userProfile.last_name}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <Text>{this.getTier(this.props.userProfile.payment_tier)}</Text>
          <View>
            <View>
              <Text>{this.props.checkin.when}</Text>
              <Text>Check placeholder</Text>
            </View>
          </View>
        </View>
      </View>
    )


  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  heading: {
    flex: .3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameHolder: {
    flex: .4,
    justifyContent: "center"
  },
  headingFirstName: {
    fontSize: 27,
  },
  headingLastName: {
    fontSize: 20,
  },
  body: {
    flex: .7,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  imgContainer: {
    flex:.6,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10
  },
  checkinImg: {
    borderRadius: 700,
    width: "70%",
    height: "100%"
  },
  whiteText: {
    color: "white"
  }
});

function mapStateToProps(state){
  return {
    checkin: state.checkin,
    userProfile: state.user.details
  }
}

export default connect(mapStateToProps)(PostCheckIn)
