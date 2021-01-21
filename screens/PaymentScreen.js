import React, { Component } from 'react';

import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, ScrollView,
         TouchableOpacity, NativeModules, ActivityIndicator, Linking,SafeAreaView } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { connect } from 'react-redux';
import stripe from 'tipsi-stripe'
import Layout from '../constants/Layout';
import Icon from 'react-native-vector-icons/AntDesign';
import { createCharge } from '../actions/paymentActions';
import CarouselCard, { ITEM_WIDTH } from '../components/payments/CarouselCard'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import plans from '../components/payments/Plans'


class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.plans=plans;
    this.state = {
      selectedOption: 0,
      // autoRenew: false
    }
    this.paymentOptions = [
      {
        key: "70",
        title: "Free Trial+       Monthly Access",
        price: 70,
        period: "month",
        chargeInfoText: "Your card will be charged on ",
        bullets: [
          (<Text>Try Gymhop free for one week</Text>),
          (<Text>Get unlimited access to every GymHop gym</Text>),
          (<Text><Text>When the week trial is up, you will be billed </Text><Text style={{fontWeight: "bold"}}>$70 a month.</Text></Text>),
          (<Text>
            <Text>Cancel anytime to avoid charges by emailing us at </Text>
            <Text
                style={{color:"#0000EE"}}
                onPress={() => {
                  Linking.openURL('mailto:contact@gymhop.us?subject=Cancel%20Subscription&body=Let%20us%20know%20what%20we%20could%20do%20better')
                }}>
                contact@gymhop.us
            </Text>
          </Text>)
        ],
        extraInfo: <Text>**Limit one free trial per customer. If your have already used the trial, you will be billed immediately upon signup.</Text>,
        image: {
          uri: require("../assets/images/monthly_photo.jpg")
        },
        background: "#39E3FF",
      },
      {
        key: "20",
        title: "One Week Access",
        price: 20,
        period: "week",
        chargeInfoText: "Immediate charge, expires on ",
        bullets: [
          (<Text>Want to try Gymhop? Buy a week!</Text>),
          (<Text>Get unlimited access to every GymHop gym</Text>),
          (<Text><Text>You'll be billed</Text><Text style={{fontWeight:"bold"}}> $20</Text><Text> upon checkout</Text></Text>),
          (<Text>Refund available if the pass is unused</Text>)
        ],
        extraInfo: <Text>Pass will last for one week before automatically expiring. To regain access, buy another pass or sign up for our monthly membership.</Text>,
        image: {
          uri: require("../assets/images/weekly_photo.jpg")
        },
        background: "yellow",
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
    console.log(this.state)
    if (this.props.paymentSuccessful && this.props.paymentSuccessful != prevProps.paymentSuccessful) {
      this.props.navigation.push("PaymentSuccess");
    }
  }

  static navigationOptions = {
    headerStyle: {
            backgroundColor: '#ffd1dc',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
    };

  constructPaymentDetail = () => {
    if (this.state.selectedOption != null) {
      var userId = this.props.userId;
      var passName = plans[this.state.selectedOption].period+ "ly pass";
      var passAmount = plans[this.state.selectedOption].price;

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
        return "The Monthly Hustler: $70";
      case 1:
        return "The Weekly Warrior: $20";
      default:
        return "Select a pass option"
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
    let activeColor = this.plans[this.state.selectedOption].color

    return (
      <View style={styles.container}>
          <View style={[styles.carousel]}>
            <Carousel
                    layout={"default"}
                    ref={ref => this.carousel = ref}
                    data={this.plans}
                    sliderWidth={ITEM_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    renderItem={CarouselCard}
                    onSnapToItem = { index => 
                      this.setState({selectedOption:index})
                     } 
            />
            {/* <View style={styles.detailsWrap}>
              <ScrollView style={styles.details}>
                <TouchableOpacity
                  style={[{backgroundColor: activeColor, color: "white", flexDirection: "row", justifyContent: "center"} ,styles.lightGrayBtn]}
                  onPress={this.openNativePurchaseOption}>
                    <Text style={styles.lightGrayBtnText}>Subscribe</Text>
                  {this.props.paymentPending ? <ActivityIndicator size="small" color="#009688" /> : null}
                </TouchableOpacity>
            </ScrollView>
          </View> */}
          </View>
          <View style={styles.dotWrap}>
              <Pagination
                dotsLength={this.plans.length}
                activeDotIndex={this.state.selectedOption}
                carouselRef={this.carousel}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.92)'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
              />
            </View>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex:1,
  },
  carousel:{
    elevation:1,
    justifyContent:'center',
    flex:9
  },
  details:{
    padding:20,
  },
  detailsWrap:{
    borderTopColor: '#1a1a1a',
    borderTopWidth: 1,
  },
  dotWrap:{
    justifyContent:'flex-end'
  }
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
