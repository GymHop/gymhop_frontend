import React from 'react';

import { View, Text, Image, TouchableOpacity, ScrollView, Button } from 'react-native'
import { dateFormatter } from '../../utils/datetime';
import { styles } from '../../styles/settings';

import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

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
                      updatePending
                    }) {
    var tierType;
    switch (tier) {
      case 1:
        tierType = "Budget Tier @40/month";
        break;
      case 2:
        tierType = "Premium tier @80/month";
        break;
      default:
          tierType = "No Tier"
    }
    var billingEndDate;
    let d = new Date(billingStartDate)
    d.setMonth(d.getMonth() + 1);

    billingEndDate = dateFormatter(d, "date-time")
    let bday = birthday ? dateFormatter(birthday, "date") : "";
    console.log(updatePending);
    console.log(bday);


    return (
      <View style={styles.profileContainer}>
        <View style={styles.profilePicContainer}>
          <Image source={{uri: profilePic}}
          style={[styles.profilePic, {width: 150, height: 150}]}
          />
          <TouchableOpacity onPress={toggleEditing} style={styles.profileIconContainer} >
            <Feather name="edit-2" size={32} color={Colors.tintColor} />
          </TouchableOpacity>
          <Text style={styles.editPromptText}>Tap to edit your details</Text>
        </View>
        <ScrollView style={styles.profileDetailsContainer}>
          <View style={styles.dataLabel}>
              <Text>First Name</Text>
          </View>
          <Text style={styles.dataField}>  {firstName}</Text>

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
