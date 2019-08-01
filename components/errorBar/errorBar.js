import React from 'react';
import TakeMoney from '../Stripe/StripeCheckout';

import { View, Text, Image, StyleSheet, BackHandler, 
    TouchableOpacity, Linking } from 'react-native';

const ErrorBar = ({payment_tier}) => {
    if (payment_tier == 0) {
        return (
            <View style={styles.errorBar}>
                <TouchableOpacity 
                    onPress={() => {
                    Linking.openURL('https://www.gymhop.us/membership-1')
                    }}

                    >
                        <Text>
                            Click here to subscribe and activate your membership!
                        </Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    errorBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#E02618',
        color: 'white'
      }, 
})


export default ErrorBar;

