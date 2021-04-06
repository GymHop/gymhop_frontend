import React from 'react';
import {TouchableOpacity, Text} from 'react-native'
import { styles } from '../styles/settings';


const UpgradeButton = ({tier}) => {

    if (tier === 4) {
        return(
            <TouchableOpacity onPress={gotoPayments}
            style={styles.goldButton}
            >
              <Text style={{color: 'black', fontSize: 16}}>Upgrade to Premium</Text>
            </TouchableOpacity>
        )
    } else {
        return null;
    }
}

export default UpgradeButton;