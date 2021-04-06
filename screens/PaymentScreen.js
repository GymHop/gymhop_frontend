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

import Colors from '../constants/Colors';
import { color } from 'react-native-reanimated';


class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.plans=plans;
    this.state = {
      selectedOption: 0,
      // autoRenew: false
    }
  }

  componentDidMount = () => {
    stripe.setOptions({
      publishableKey: 'pk_live_LuhTWIM44w3VZ89nVbvQNEph',
      merchantId: 'merchant.frontend.gymhop.us', // iOS
      androidPayMode: 'production', // Android
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
            backgroundColor: Colors.tabBar,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
    };

  constructPaymentDetail = () => {
    if (this.state.selectedOption != null) {
      var userId = this.props.userId;
      var passName = this.plans[this.state.selectedOption].title;
      var passAmount = this.plans[this.state.selectedOption].price;

      let details = {
        id: 'gymhop_member_'+ userId,
        displayItems: [
          {
            label: 'Gymhop US ' + passName + ' pass',
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

  
  openNativePurchaseOption = () => {
    let paymentOptions = this.constructPaymentDetail();
    console.log("purchasing starting with option " + this.state.selectedOption + " selected");
    if (paymentOptions) {
      let price = this.plans[this.state.selectedOption].price.toString();
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
        label:'GymHop US ',
        description: 'Gymhop Membership',
        total_price: price,
        unit_price: price,
        quantity: '1',
        amount:price
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
          <View style={styles.termsWrap}>
            <Text style={styles.terms}>
              {this.plans[this.state.selectedOption].terms}
            </Text>
            <Text style={styles.terms}>
                    Cancel anytime by emailing&nbsp;
                    <Text
                      style={[styles.terms,{color:"blue"}]}
                      onPress={() => {
                      Linking.openURL('mailto:contact@gymhop.us?subject=Cancel%20Subscription&body=Let%20us%20know%20what%20we%20could%20do%20better')
                      }}>
                      contact@gymhop.us
                    </Text>
            </Text>
          </View>
          <View>
            <TouchableOpacity
                  style={[{backgroundColor: this.plans[this.state.selectedOption].color} ,styles.subButton]}
                  onPress={this.openNativePurchaseOption}>
                    <Text style={styles.subButtonText}>{this.plans[this.state.selectedOption].buttonText}</Text>
                  {this.props.paymentPending ? <ActivityIndicator size="small" color="#009688" /> : null}
            </TouchableOpacity>
          </View>
          
          
            
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fdfdfd',
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
  },
  subButton:{
    marginLeft:20,
    marginRight:20,
    marginBottom: 50,
    borderRadius:50,
    justifyContent:'center',
    height: 55,
    
  },
  subButtonText:{
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign:'center',
    textShadowColor: '#1a1a1a',
    textShadowRadius: 2,
  },
  termsWrap:{
    flex:4,
    marginLeft:20,
    marginRight:20,
  },
  terms:{
    textAlign:'center',
    paddingBottom:10
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
