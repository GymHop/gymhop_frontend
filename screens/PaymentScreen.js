import React, { Component } from 'react';

import { View, Text, StyleSheet, Button, TouchableOpacity, NativeModules } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { connect } from 'react-redux';
import stripe from 'tipsi-stripe'
import Layout from '../constants/Layout';
import Icon from 'react-native-vector-icons/AntDesign';
import { createCharge } from '../actions/paymentActions';


import SelectableCard from '../components/payments/SelectableCard';

class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      // autoRenew: false
    }
    this.paymentOptions = [
      {
        key: "70",
        price: 70,
        period: "month",
        description: "Get access to our entire network for the entire month. Plus full support from our team",
        image: {
          uri: require("../assets/images/monthly_photo.jpg")
        },
        background: "#39E3FF",
        icon: <Icon name="idcard" size={30} color="#000000" />
      },
      {
        key: "20",
        price: 20,
        period: "week",
        description: "Our most popular option. Useful if you're on the go or just don't like that commitment thing",
        image: {
          uri: require("../assets/images/weekly_photo.jpg")
        },
        background: "#FF695D",
        icon: <Icon name="carryout" size={30} color="#000000" />
      }
    ]
  }

  componentDidMount = () => {
    stripe.setOptions({
      publishableKey: 'pk_test_77YUPGjCnGcpWsNkHegQjw8l',
      merchantId: 'merchant.frontend.gymhop.us', // iOS
      androidPayMode: 'test', // Android
    })
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

  constructPaymentDetail = () => {
    if (this.state.selectedOption != null) {
      var userId = this.props.userId;
      var passName = this.paymentOptions[this.state.selectedOption].period+ "ly pass";
      var passAmount = this.paymentOptions[this.state.selectedOption].price;

      let details = {
        id: 'gymhop_member_'+ userId,
        displayItems: [
          {
            label: 'Gymhop US ' + passName,
            amount: { currency: 'USD', value: passAmount }
          }
        ],
        total: {
          label: 'Gymhop US',
          amount: { currency: 'USD', value: passAmount }
        }
      };
      return details;
    } else {
      console.log("the user needs to select an option before checking out");
      return null;
    }

  }

  getPassName = () => {
    switch (this.state.selectedOption) {
      case 0:
        return "The Monthly Hustler";
      case 1:
        return "The Weekly Workhorse";
      default:
        return "Select a pass option"

    }
  }

  openNativePurchaseOption = () => {
    let paymentOptions = this.constructPaymentDetail();
    console.log("purchasing starting with option " + this.state.selectedOption + " selected");
    if (paymentOptions) {
      let price = this.paymentOptions[this.state.selectedOption].price.toString();
      stripe.paymentRequestWithNativePay({
        total_price: price,
        currency_code: 'USD',
        shipping_address_required: false,
        phone_number_required: false,
        line_items: [{
          currency_code: 'USD',
          description: 'Gymhop Membership',
          total_price: price,
          unit_price: price,
          quantity: '1',
        }]
      }).then((token) => {
        let choosenTier = this.state.selectedOption;
        let stripeToken = token.tokenId;
        this.props.createCharge(this.props.token, choosenTier, token);
      }).catch((err) => {
        console.log("Error retrieving token", err);
      })
    } else {
      console.log("payment failed");
    }
  }

  render() {
    var description = this.state.selectedOption != null ?
      this.paymentOptions[this.state.selectedOption].description : "";
    var borderColor = this.state.selectedOption != null ?
      this.paymentOptions[this.state.selectedOption].background : "#979999";

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
                  key={option.key}
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
            <View style={styles.textContainer}>
              <Text style={styles.selectedOptionText}>{this.getPassName()}</Text>
              <Text>{description}</Text>
            </View>
            {/*<View style={styles.autoRenewContainer}>
              <Text style={styles.autoRenewText}>Auto Renew?</Text>
              <CheckBox
                checked={this.state.autoRenew}
                onPress={() => this.setState({autoRenew: !this.state.autoRenew})}/>
            </View>*/}
          </View>
        </View>
        <View style={styles.selectBtnContainer}>
          <TouchableOpacity
            style={[{borderColor: borderColor} ,styles.lightGrayBtn]}
            onPress={this.openNativePurchaseOption}>
            <Text style={styles.lightGrayBtnText}>Purchase</Text>
          </TouchableOpacity>
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
    paddingTop: Layout.window.height *.03,
    zIndex: 2,
    flex: 2,
    backgroundColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  optionsExecuteContainer: {
    flex: 1,
    zIndex: 1,
    position: "relative",
    backgroundColor: "#ffffff",
    paddingHorizontal: Layout.window.width *.07,
    marginHorizontal: Layout.window.width *.02,
    paddingTop: 70,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    alignItems: "center"
  },
    descriptionContainer: {
      flexDirection: "row"
    },
    textContainer: {
      flex: 3
    },
    autoRenewContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    autoRenewText: {
      textAlign: "center"
    },
    selectedOptionText: {
      fontSize: 16,
      marginVertical: 4
    },
  selectBtnContainer: {
    flex: 1,
    zIndex: 1,
    marginHorizontal: Layout.window.width *.02,
    paddingHorizontal: Layout.window.width *.07,
    backgroundColor: "#ffffff",
    justifyContent: "center"
  },
  lightGrayBtn: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 7,
      backgroundColor: "white",
      borderWidth: 1
    },
      lightGrayBtnText: {
        fontSize: 16,
        color: "#979999",
        marginLeft: 4
      },

})

function mapStateToProps(state) {
  return {
    firstName: state.user.details.first_name,
    userId: state.user.details.id,
    billingStartDate: state.user.details.billing_start_date,
    token: state.user.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createCharge: (APItoken, choosenTier, token) => dispatch(createCharge(APItoken, choosenTier, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen)
