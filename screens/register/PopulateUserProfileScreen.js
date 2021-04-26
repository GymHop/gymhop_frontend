import React from "react";

import {
  View,
  Text,
  Image,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import BirthdayPicker from "../../components/registration/BirthdayPicker";
import * as ActionCreators from "../../actions/registerActions";
import { styles } from "../../styles/registration";
import { showMessage, hideMessage } from "react-native-flash-message";

class RegisterPart2 extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    let dt = new Date();
    dt.setYear(1996);
    this.state = {
      // profile_pic: null,//user profile fields here
      // first_name: null, // server side _ casing b/c its just faster to put together
      // last_name: null,
      phone: null,
      birthday: dt,
    };
    this._storeToken = this._storeToken.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  _storeToken = async () => {
    try {
      await AsyncStorage.setItem("@Auth:APIToken", this.props.token);
    } catch (e) {}
  };

  registerUser() {
    const baseUser = this.props.navigation.getParam("baseUser", {});
    const baseIdentity = this.props.navigation.getParam("baseIdentity", {});

    let { birthday, ...restOfState } = this.state;
    if (this.state.profile_pic === null) {
      showMessage({
        message: "Please upload a profile picture!",
        type: "info",
        backgroundColor: "red",
        flex: "1",
        justifyContent: "center",
        fontSize: "18",
      });
    } else if (this.state.first_name === null) {
      showMessage({
        message: "Please input your first name!",
        type: "info",
        backgroundColor: "red",
        flex: "1",
        justifyContent: "center",
        fontSize: "18",
      });
    } else if (this.state.last_name === null) {
      showMessage({
        message: "Please input your last name!",
        type: "info",
        backgroundColor: "red",
        flex: "1",
        justifyContent: "center",
        fontSize: "18",
      });
    } else if (this.state.phone === null) { //added validation of user user phone number
      showMessage({
        message: "Please input phone number!",
        type: "info",
        backgroundColor: "red",
        flex: "1",
        justifyContent: "center",
        fontSize: "18",
      });
    } else {
      this.props.Actions.registerUser({
        ...baseUser,
        ...baseIdentity,
        ...restOfState,
        birthday: birthday.valueOf(),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.success === true && this.props.userProfileSuccess === true) {
      console.log(
        "good register of user AND user profile, moving the user to the home page"
      );
      this._storeToken();
      this.props.navigation.push("Main");
    }
    if (
      Object.keys(this.props.registrationErrors).length !=
      Object.keys(prevProps.registrationErrors).length
    ) {
      // issue signing up
      console.log(this.props.registrationErrors);
      if (this.props.registrationErrors.username != undefined) {
        showMessage({
          message: "Username already taken. Try another",
          type: "info",
          backgroundColor: "red",
          flex: "1",
          justifyContent: "center",
          fontSize: "18",
          duration: 3000,
        });
      }
      if (this.props.registrationErrors.email != undefined) {
        showMessage({
          message: "Email address already in use. Try another",
          type: "info",
          backgroundColor: "red",
          flex: "1",
          justifyContent: "center",
          fontSize: "18",
          duration: 3000,
        });
      }
      this.props.Actions.clearErrors();
    }
  }

  render() {
    let year = this.state.birthday.getFullYear();
    let month = this.state.birthday.getMonth();
    let day = this.state.birthday.getDate();

    // let selectedYear = this.state.birthday.getFullYear();
    return (
      // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      //   <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios'?'padding':null} enabled>
      //   <View style={styles.textStyle}>
      //     <Text style={styles.photoText}>Click to add a profile picture!</Text>
      //   </View>
      //   <View style={styles.photoUploadContainer}>
      //     <PhotoUploadForm
      //     profile_pic={this.state.profile_pic}
      //     onPhotoSelected={(pic)=>this.setState({profile_pic: pic})}/>
      //   </View>
      //   <TextInput
      //     style={styles.registerInput}
      //     placeholder={'First Name'}
      //     placeholderTextColor={'#8f8f8f'}
      //     onChangeText={(text) => this.setState({first_name: text})}
      //   />
      //   <TextInput
      //     style={styles.registerInput}
      //     placeholder={'Last Name'}
      //     placeholderTextColor={'#8f8f8f'}
      //     onChangeText={(text) => this.setState({last_name: text})}
      //   />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : null}
          enabled
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: "10%",
            }}
          >
            <Image
              source={require("../../assets/images/bunnyblackwhite.png")}
              style={styles.headLogo}
              resizeMode="contain"
            />
            <Text
              style={[styles.whiteText, { marginTop: 10, marginBottom: 5 }]}
            >
              Enter your cell number
            </Text>
            <TextInput
              style={styles.registerInput}
              placeholder={"Cell phone number"}
              inlineImageLeft="phone"
              keyboardType={"phone-pad"}
              placeholderTextColor={"#8f8f8f"}
              maxLength={10}
              onChangeText={(text) => {
                if (text.replace(/\D/g, "").length > 9) {
                  Keyboard.dismiss();
                }
                this.setState({ phone: text.replace(/\D/g, "") });
              }}
              // onChangeText={(text) => {this.handlePhoneInput(text)}}
            />
            <Text
              style={[styles.whiteText, { marginTop: 10, marginBottom: 5 }]}
            >
              Enter your birthday
            </Text>
            <View style={{ marginBottom: 22 }}>
              <BirthdayPicker
                styles={[styles.registerInput, styles.registerBirthdayPicker]}
                lightmode
                selectedYear={year}
                selectedMonth={month}
                selectedDay={day}
                onYearValueChange={(year, i) => {
                  let bDay = new Date(this.state.birthday);
                  bDay.setFullYear(year);
                  this.setState({ birthday: bDay }); // never use the same instance of mutated state in setState
                }}
                onMonthValueChange={(month, i) => {
                  let bDay = new Date(this.state.birthday);
                  bDay.setMonth(month);
                  this.setState({ birthday: bDay });
                }}
                onDayValueChange={(day, i) => {
                  let bDay = new Date(this.state.birthday);
                  bDay.setDate(day);
                  this.setState({ birthday: bDay });
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => {
                this.registerUser();
              }}
            >
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                this.props.navigation.pop();
              }}
            >
              <Text style={styles.loginText}>Back</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.user.registeredSuccessfully,
    registrationErrors: state.user.errors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(ActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPart2);
