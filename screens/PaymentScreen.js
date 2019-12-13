import React, { Component } from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';

import SelectableCard from '../components/payments/SelectableCard'

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
        }
      },
      {
        price: 20,
        period: "week",
        description: " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: {
          uri: require("../assets/images/weekly_photo.jpg")
        }
      }
    ]
  }

  static navigationOptions = {
    header: null,
  };

  openNativePurchaseOption = () => {
    console.log("purchasing starting with option " + this.state.selectedOption + " selected");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Hey {this.props.firstName}! Its time to get to work</Text>
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
        <Button
          onPress={this.openNativePurchaseOption}
          title="Purchase">
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

function mapStateToProps(state) {
  return {
    firstName: state.user.details.first_name,
    billingStartDate: state.user.details.billing_start_date,
  }
}

export default connect(mapStateToProps)(PaymentScreen)
