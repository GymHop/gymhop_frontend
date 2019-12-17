import React, { Component } from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import Layout from '../constants/Layout';
import Icon from 'react-native-vector-icons/AntDesign'

import SelectableCard from '../components/payments/SelectableCard';

const METHOD_DATA = [{
  supportedMethods: ['apple-pay', 'google-pay'],
  data: {
    merchantIdentifier: 'merchant.com.your-app.namespace',
    supportedNetworks: ['visa', 'mastercard', 'amex'],
    countryCode: 'US',
    currencyCode: 'USD'
  }
}];

class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    }
    this.paymentOptions = [
      {
        price: 70,
        period: "month",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: {
          uri: require("../assets/images/monthly_photo.jpg")
        },
        background: "#BFBFBF",
        icon: <Icon name="idcard" size={30} color="#000000" />
      },
      {
        price: 20,
        period: "week",
        description: " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: {
          uri: require("../assets/images/weekly_photo.jpg")
        },
        background: "#BFBFBF",
        icon: <Icon name="carryout" size={30} color="#000000" />
      }
    ]
  }

  static navigationOptions = {
    headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
    };

  openNativePurchaseOption = () => {
    console.log("purchasing starting with option " + this.state.selectedOption + " selected");
  }

  render() {
    var description = this.state.selectedOption != null ?
      this.paymentOptions[this.state.selectedOption].description : ""

    return (
      <View style={styles.container}>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>
            Hey {this.props.firstName}!
          </Text>
          <Text style={styles.titleSubtext}>
            Its time to get to work
          </Text>
        </View>
        <View style={styles.optionsSelectableContainer}>
          {this.paymentOptions.map((option, idx) => {
            return (
              <SelectableCard
                  selected={this.state.selectedOption === idx}
                  onSelect={() => {
                    this.setState({selectedOption: idx})
                  }}
                  {...option}
                  />
            )
          })}
        </View>
        <View style={styles.optionsExecuteContainer}>
          <View style={styles.descriptionContainer}>
            <Text>{description}</Text>
          </View>
          <Button
            onPress={this.openNativePurchaseOption}
            title="Purchase">
          </Button>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000"
  },
  titleTextContainer: {
    paddingLeft: Layout.window.width * .03,
  },
    titleText: {
      color: "#ffffff",
      fontSize: 16
    },
    titleSubtext: {
      color: "#ffffff",
    },
  optionsSelectableContainer: {
    position: "relative",
    marginHorizontal: Layout.window.width *.02,
    zIndex: 2,
    flex: 2,
    backgroundColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  optionsExecuteContainer: {
    flex: 3,
    zIndex: 1,
    position: "relative",
    borderWidth: 1,
    backgroundColor: "#F2F2F2",
    paddingTop: 70,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    alignItems: "center"
  }
})

function mapStateToProps(state) {
  return {
    firstName: state.user.details.first_name,
    billingStartDate: state.user.details.billing_start_date,
  }
}

export default connect(mapStateToProps)(PaymentScreen)
