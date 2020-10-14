import React from 'react';
import {TouchableOpacity, Text} from 'react-native'
import { styles } from '../styles/settings';


const SubscriptionButton = ({tier}) => {

    if (tier === 4 || tier === 8) {
        return null;
    } else {
        return(
            <TouchableOpacity onPress={gotoPayments}
            style={styles.goldButton}
            >
              <Text style={{color: 'black', fontSize: 16}}>Subscription Options</Text>
            </TouchableOpacity>
        );
    }
}

export default SubscriptionButton;