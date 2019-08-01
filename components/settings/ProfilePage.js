import React from 'react';

import { View, Text, Image, TouchableOpacity, ScrollView, Button } from 'react-native'
import { dateFormatter } from '../../utils/datetime';
import { styles } from '../../styles/settings';

import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

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
                    }) {
    var tierType;
    switch (tier) {
      case 1:
        tierType = "Default";
        break;
      case 2:
        tierType = "Trial Member";
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
        tierType = "Premium tier @80/month"
        break;
      default:
          tierType = "No Tier"
    }
    var billingEndDate;
    let d = new Date(billingStartDate)
    d.setMonth(d.getMonth() + 1);

    billingEndDate = dateFormatter(d, "date-time")
    let bday = birthday ? dateFormatter(birthday, "date") : "";

    let profileHeight = Layout.window.height/6
  

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
          source={require('../../assets/images/gymHopWhite.png')}
          style={styles.brandLogo}
          resizeMode='contain'
          />
        </View>
          <View style={styles.profilePicContainer}>
            <Image source={{uri: profilePic}}
            style={[styles.profilePic, {width: profileHeight, height: profileHeight }]}
            />
            <TouchableOpacity onPress={toggleEditing} style={styles.profileIconContainer} >
              <Feather name="edit-2" size={32} color={Colors.tintColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleEditing} style={styles.promptTextContainer}>
              <Text style={styles.editPromptText}>Tap to edit your details</Text>
            </TouchableOpacity>
          </View>
        <ScrollView style={styles.profileDetailsContainer}>
          <View style={styles.dataContainer}>
            <View style={styles.dataLabel}>
                <Text>First Name</Text>
            </View>
            <Text style={styles.dataField}>  {firstName}</Text>
          </View>
            <View style={styles.dataLabel}>
              <Text>Last Name</Text>
            </View>
            <Text style={styles.dataField}>  {lastName}</Text>

            <View style={styles.dataLabel}>
              <Text>Billing End Date</Text>
            </View>
            <Text style={styles.dataField}>  {billingEndDate}</Text>

            <View style={styles.dataLabel}>
              <Text>Payment Tier</Text>
            </View>
            <Text style={styles.dataField}>  {tierType}</Text>

            <View style={styles.dataLabel}>
              <Text>Birthday</Text>
            </View>
            <Text style={styles.dataField}>{bday}</Text>

            <View style={styles.dataLabel}>
              <Text>Phone</Text>
            </View>
            <Text style={styles.dataField}>{phone}</Text>

          <Button onPress={logout}
          title="Logout"
          ></Button>
        </ScrollView>
      </View>
    )
}
