import React, { Component } from 'react';

import { View, Text, StyleSheet, Button, TouchableWithoutFeedback,
         TouchableOpacity, NativeModules, ActivityIndicator } from 'react-native';
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
        bullets: [
          (<Text>Try Gymhop free for one week</Text>),
          (<Text>Get unlimited access to every GymHop gym</Text>),
          (<View style={{flexDirection: "row"}}><Text>When the week trial is up, you will be billed </Text><Text style={{fontWeight: "bold"}}>$80 a month.</Text></View>),
          (<View style={{flexDirection: "row"}}>
            <Text>Cancel anytime to avoid charges by emailing us at </Text>
            <TouchableWithoutFeedback onPress={() => {
                  Linking.openURL('mailto:contact@gymhop.us?subject=Cancel%20Subscription&body=Let%20us%20know%20what%20we%20could%20do%20better')
                }}>
                <Text style={{color:"#0000EE"}}>contact@gymhop.us</Text>
            </TouchableWithoutFeedback>
          </View>)
        ],
        extraInfo: <Text>**Limit one free trial per customer. If your have already used the trial, you will be billed immediately upon signup.</Text>,
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
        bullets: [
          (<Text>Afraid of commitment? Buy a week!</Text>),
          (<Text>Get unlimited access to every GymHop Gym</Text>),
          (<View style={{flexDirection: "row"}}><Text>You'll be billed</Text><Text style={{fontWeight:"bold"}}> $20</Text><Text> upon checkout</Text></View>),
          (<Text>Refund available if the pass is unused</Text>)
        ],
        extraInfo: <Text>Pass will last for one week before automatically expiring. To regain access, buy another pass or sign up for our monthly membership.</Text>,
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

  componentDidUpdate(prevProps) {
    if (this.props.paymentSuccessful && this.props.paymentSuccessful != prevProps.paymentSuccessful) {
      this.props.navigation.push("PaymentSuccess");
    }
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
        return "The Monthly Hustler: $80";
      case 1:
        return "The Weekly Warrior: $20";
      default:
        return "Select a pass option"
    }
  }

  getBullets = () => {
    if (this.state.selectedOption) {
      return this.paymentOptions[this.state.selectedOption].bullets.map((item) => {
        return (
          <View>
            <View style={flex: 1}><Text>-</Text></View>
            <View style={flex: 5}>{item}</View>
          </View>
        )
      });
    } else {
      return null;
    }
  }
  getExtraInfo = () => {
    if (this.state.selectedOption) {
      return this.paymentOptions[this.state.selectedOption].extraInfo
    } else {
      return null;
    }
  }

  openNativePurchaseOption = () => {
    let paymentOptions = this.constructPaymentDetail();
    console.log("purchasing starting with option " + this.state.selectedOption + " selected");
    if (paymentOptions) {
      let price = this.paymentOptions[this.state.selectedOption].price.toString();
      stripe.paymentRequestWithNativePay(options={
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
      },
      [{
        currency_code: 'USD',
        description: 'Gymhop Membership',
        total_price: price,
        unit_price: price,
        quantity: '1',
      }]

    ).then((token) => {
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
              <View style={styles.bulletsContainer}>{this.getBullets()}</View>
              <View style={styles.extraInfoContainer}>{this.getExtraInfo()}</View>
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
            style={[{backgroundColor: borderColor, color: "white", flexDirection: "row", justifyContent: "center"} ,styles.lightGrayBtn]}
            onPress={this.openNativePurchaseOption}>
            <Text style={styles.lightGrayBtnText}>Purchase</Text>
            {this.props.paymentPending ? <ActivityIndicator size="small" color="#009688" /> : null}
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
    flex: 1,
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
      bulletsContainer: {

      },
      extraInfoContainer: {

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
    token: state.user.token,
    paymentPending: state.user.paymentPending,
    paymentSuccessful: state.user.paymentSuccessful
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createCharge: (APItoken, choosenTier, token) => dispatch(createCharge(APItoken, choosenTier, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen)
