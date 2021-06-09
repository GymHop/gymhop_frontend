import React from 'react';

import { View, Text, Image, TouchableOpacity, ScrollView, Button } from 'react-native'
import { dateFormatter } from '../../utils/datetime';
import { styles } from '../../styles/settings';

import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import UpgradeButton from '../UpgradeButton';
import SubscriptionButton from '../SubscriptionButton';

export default function ProfilePage({tier,
                      profilePic,
                      firstName,
                      lastName,
                      toggleEditing,
                      logout,
                      birthday,
                      billingStartDate,
                      gender,
                      phone,
                      updatePending,
                      navigation
                    }) {
    var tierType;
    switch (tier) {
      case 1:
        tierType = "Default";
        break;
      case 2:
        tierType = "Weekly Member";
        break;
      case 3:
        tierType = null;
        break;
      case 4:
        tierType = "Budget tier @40/month";
        break;
      case 5:
        tierType = null;
        break;
      case 6:
        tierType = null;
        break;
      case 7:
        tierType = null;
        break;
      case 8:
        tierType = "All Access @80/month"
        break;
      default:
          tierType = "No Tier"
    }
    let bday = birthday ? dateFormatter(birthday, "date") : "";

    let profileHeight = Layout.window.height/6

    gotoPayments = () => {
      navigation.push("Subscribe");
    }

    getBillingDetails = () => {
      if (tier==2) {
        var billingEndDate;
        let d = new Date(billingStartDate)
        d.setDate(d.getDate() + 7);

        billingEndDate = dateFormatter(d, "date-time")
        return (
          <View>
            <View style={styles.dataLabel}>
              <Text>Weekly membership expires on</Text>
            </View>
            <Text style={styles.dataField}>{billingEndDate}</Text>
          </View>
        );
      } else if (tier==8) {
        var billingEndDate;
        let d = new Date(billingStartDate)
        d.setMonth(d.getMonth() + 1);

        billingEndDate = dateFormatter(d, "date-time")
        return (
          <View>
            <View style={styles.dataLabel}>
              <Text>Subscription Renews on</Text>
            </View>
            <Text style={styles.dataField}>{billingEndDate}</Text>
          </View>
        )
      } else {
        return (
          <View>
            <View style={styles.dataLabel}>
              <Text>You dont currently have a subscription</Text>
            </View>
            <Text style={styles.dataField}>--</Text>
          </View>
        );
      }
    }

    return (
        // <View style={styles.imageContainer}>
        //   <Image
        //   source={require('../../assets/images/gymHopWhite.png')}
        //   style={styles.brandLogo}
        //   resizeMode='contain'
        //   />
        // </View>
      <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
            <Image
            source={require('../../assets/images/gymhop.png')}
            style={styles.brandLogo}
            resizeMode='contain'
            />
          </View>
          <View style={styles.profilePicContainer}>
            <Image source={require('../../assets/images/try_this.jpg')} style={{position: 'absolute', width: '100%', height: 250, opacity: .8}} />
            <Image source={{uri: profilePic}}
            style={[styles.profilePic, {width: profileHeight, height: profileHeight }]}
            />
            <TouchableOpacity onPress={toggleEditing} style={styles.promptTextContainer}>
              <Text style={styles.editPromptText}>Tap to edit your details</Text>
            </TouchableOpacity>
          </View>
        <ScrollView style={styles.profileDetailsContainer}>
          <View style={styles.dataContainer}>
            <View style={styles.dataLabel}>
                <Text style={styles.dataLabelText}>Full Name</Text>
            </View>
            <View style={styles.dataFieldCont} >
              <Text style={styles.dataField}>  {firstName} {lastName} </Text>
            </View>
          </View>
            {getBillingDetails}
            <View style={styles.dataLabel}>
              <Text style={styles.dataLabelText}>Payment Tier</Text>
            </View>
            <View style={styles.dataFieldCont} >
            <Text style={styles.dataField}>  {tierType}</Text>
            </View>
            <View style={styles.dataLabel}>
              <Text style={styles.dataLabelText}>Birthday</Text>
            </View>
            <View style={styles.dataFieldCont} >
              <Text style={styles.dataField}>{bday}</Text>
            </View>

            <View style={styles.dataLabel}>
              <Text style={styles.dataLabelText}>Phone</Text>
            </View>
            <View style={styles.dataFieldCont} >
              <Text style={styles.dataField}>{phone}</Text>
            </View>
        </ScrollView>
        <View style={styles.buttonBox}>
            <SubscriptionButton tier={tier}/>
            <UpgradeButton tier={tier} />
            <TouchableOpacity  style={styles.button} onPress={logout}>
              <Text style={{color: 'black', fontSize: 16}}>Log Out</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
}
