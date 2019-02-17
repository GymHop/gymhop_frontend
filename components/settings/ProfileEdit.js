import React, { Component } from 'react';
import BirthdayPicker from '../registration/BirthdayPicker';

import { View, Text, StyleSheet, ActivityIndicator,
         TouchableOpacity, TextInput, Button } from 'react-native'
import { styles } from '../../styles/editSettings';

class ProfileEdit extends Component {

  constructor(props) {
    super(props);

    // {var1, var2, ...other} is an option if we user other but we might get stuff we dont want depending
    // on how the component is instanciated
    this.state = {
      // profilePic: this.props.profilePic,
      first_name: this.props.firstName,
      last_name: this.props.lastName,
      birthday: this.props.birthday ? new Date(this.props.birthday) : new Date(),
      phone: this.props.phone,
    }
    this.saveUserDetails = this.saveUserDetails.bind(this);
  }

  // would be nice to edit in place in the other screen but would have to refactor into a stateful cmpt
  // useState would also work

  saveUserDetails() {
    var payload = {...this.state};
    payload.birthday = payload.birthday.valueOf
    this.props.UserActions.updateUserDetails(this.props.token, payload);
    this.props.toggleEditing()
  }

  render() {

    let year = this.state.birthday.getFullYear();
    let month = this.state.birthday.getMonth();
    let day = this.state.birthday.getDate();

    return (
      <View style={styles.container}>

        {/* profile photo todo b/c of rn link constraint */}
        <Text>Your Profile Details</Text>
        <Text>Fully aware this is super bare bones here D:</Text>

        <View>
          <TextInput
          style={styles.infoInput}
          onChangeText={(first_name) => this.setState({first_name})}
          value={this.state.first_name}
          placeholder="First Name"
          />
        </View>
        <View style={styles.infoInputField}>
          <TextInput
              style={styles.infoInput}
              onChangeText={(last_name) => this.setState({last_name})}
              value={this.state.last_name}
              placeholder="Last Name"
          />
        </View>
        <View style={[styles.birthdayContainer]}>
          <Text>Your Birthday</Text>
          <BirthdayPicker
            styles={[styles.birthdayInput]}
            selectedYear={year}
            selectedMonth={month}
            selectedDay={day}
            onYearValueChange={(year,i) => {
              let bDay = new Date(this.state.birthday);
              console.log(bDay);
              bDay.setFullYear(year);
              console.log(bDay);
              this.setState({birthday: bDay}) // never use the same instance of mutated state in setState
            }}
            onMonthValueChange={(month,i) => {
              let bDay = new Date(this.state.birthday);
              bDay.setMonth(month);
              this.setState({birthday: bDay})
            }}
            onDayValueChange={(day,i) => {
              let bDay = new Date(this.state.birthday);
              bDay.setDate(day);
              this.setState({birthday: bDay})
            }}
          />
        </View>
        <View style={styles.infoInputField}>
          <TextInput
              style={styles.infoInput}
              onChangeText={(phone) => this.setState({phone})}
              value={this.state.phone}
              placeholder="Phone Number"
              keyboardType={'phone-pad'}
          />
        </View>
        {
          this.props.userProfileUpdatePending ?
          <ActivityIndicator size="large" color="#0000ff" />
          :
          <Button
            onPress={this.saveUserDetails}
            title="Save">
          </Button>
        }


      </View>
    )
  }

}
export default ProfileEdit
