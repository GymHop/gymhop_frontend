import React from 'react';

import { View, Text, Image, Platform, Keyboard,
  TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import PhotoUploadForm from '../../components/registration/PhotoUploadForm';
import BirthdayPicker from '../../components/registration/BirthdayPicker';
import * as ActionCreators from '../../actions/registerActions';
import { styles } from '../../styles/registration';

class RegisterPart2 extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    let dt = new Date()
    dt.setYear(1996)
    this.state = {
      //user profile fields here
      first_name: null, // server side _ casing b/c its just faster to put together
      last_name: null,
      phone: null,
      birthday: dt
    }
    this._storeToken = this._storeToken.bind(this);
  }

  _storeToken = async () => {
    try {
      await AsyncStorage.setItem('@Auth:APIToken', this.props.token);
    } catch (e) {
    }
  };

  registerUser() {
    const baseUser = this.props.navigation.getParam('baseUser', {});

    let { birthday, ...restOfState } = this.state
    this.props.Actions.registerUser({
      ...baseUser,
      ...restOfState,
      birthday: birthday.valueOf()
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.success === true && this.props.userProfileSuccess === true) {
      console.log("good register of user AND user profile, moving the user to the home page");
      this._storeToken()
      this.props.navigation.push("Main");
    }
  };

  handlePhoneInput = (text) => {
    if (text.length > 10) {
      Keyboard.dismiss();
    }
    this.setState({phone: text});
  }

  render () {

    let year = this.state.birthday.getFullYear();
    let month = this.state.birthday.getMonth();
    let day = this.state.birthday.getDate();

    // let selectedYear = this.state.birthday.getFullYear();
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios'?'padding':null} enabled>
        <Image
          source={require('../../assets/images/loginheader.png')}
          style={styles.headLogo}
          resizeMode='contain'
      />
      <TextInput
        style={styles.registerInput}
        placeholder={'First Name'}
        placeholderTextColor={'#8f8f8f'}
        onChangeText={(text) => this.setState({first_name: text})}
      />
      <TextInput
        style={styles.registerInput}
        placeholder={'Last Name'}
        placeholderTextColor={'#8f8f8f'}
        onChangeText={(text) => this.setState({last_name: text})}
      />
      <TextInput
        style={styles.registerInput}
        placeholder={'Cell phone number'}
        inlineImageLeft='phone'
        keyboardType={'phone-pad'}
        placeholderTextColor={'#8f8f8f'}
        onChangeText={(text) => {this.handlePhoneInput(text)})}
      />
      {/*<PhotoUploadForm onPhotoSelected={(pic)=>this.setState({profile_pic: pic})}/>*/}
      {/*<Text style={{color:"white"}}>Photo upload to be done after project ejection</Text>*/}
      <Text style={[styles.whiteText, {marginTop: 10}]}>Enter your birthday</Text>
      <View style={{marginBottom:22}}>
        <BirthdayPicker
          styles={[styles.registerInput, styles.registerBirthdayPicker]}
          lightmode
          selectedYear={year}
          selectedMonth={month}
          selectedDay={day}
          onYearValueChange={(year,i) => {
            let bDay = new Date(this.state.birthday);
            bDay.setFullYear(year);
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
      <TouchableOpacity style={styles.registerButton} onPress={() => {this.registerUser()}}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={() => {
            this.props.navigation.pop()
        }}>
        <Text style={styles.loginText}>Back</Text>
      </TouchableOpacity>

      </KeyboardAvoidingView>
    )
  }
}


function mapStateToProps(state) {
  return {
    success: state.user.registeredSuccessfully,
  }
}

function mapDispatchToProps(dispatch){
  return {
    Actions: bindActionCreators(ActionCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPart2)
