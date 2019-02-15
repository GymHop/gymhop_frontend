import React from 'react';

import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
// import PhotoUploadForm from '../../components/registration/PhotoUploadForm';
import BirthdayPicker from '../../components/registration/BirthdayPicker';
import { styles } from '../../styles/registration';
import { connect } from 'react-redux';

class RegisterPart2 extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      //user profile fields here
      firstName: null,
      lastName: null,
      phoneNumber: null,
      birthday: new Date().setYear(1996)
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
    // todo hookup redux
    this.props.Actions.registerUser({
      ...this.state,
      // username: this.state.username,
      // password: this.state.password,
      // email: this.state.email
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.success === true && this.props.userProfileSuccess === True) {
      console.log("good register of user AND user profile, moving the user to the home page");
      this._storeToken()
      this.props.navigation.push("Main");
    }
  };

  render () {
    const { navigation } = this.props;
    const baseUser = navigation.getParam('baseUser', {});


    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/loginheader.png')}
          style={styles.headLogo}
          resizeMode='contain'
      />
      <TextInput
        style={styles.registerInput}
        placeholder={'First Name'}
        placeholderTextColor={'#8f8f8f'}
        onChangeText={(text) => this.setState({firstName: text})}
      />
      <TextInput
        style={styles.registerInput}
        placeholder={'Last Name'}
        placeholderTextColor={'#8f8f8f'}
        onChangeText={(text) => this.setState({lastName: text})}
      />
      <TextInput
        style={styles.registerInput}
        placeholder={'Cell phone number'}
        inlineImageLeft='phone'
        keyboardType={'phone-pad'}
        placeholderTextColor={'#8f8f8f'}
        onChangeText={(text) => this.setState({phoneNumber: text})}
      />
      {/*<PhotoUploadForm onPhotoSelected={(pic)=>this.setState({profile_pic: pic})}/>*/}
      <Text style={{color:"white"}}>Photo upload to be done after project ejection</Text>
      <Text style={[styles.whiteText, {marginTop: 10}]}>Enter your birthday</Text>
      <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden', marginBottom:22}}>
        <BirthdayPicker
          styles={[styles.registerInput]}
          selectedYear={1996}
          onYearValueChange={(year,i) => {
            let bDay = this.state.birthday;
            bDay.setYear(year);
          }}
          onMonthValueChange={(month,i) => {
            let bDay = this.state.birthday;
            bDay.setMonth(month);
          }}
          onDayValueChange={(day,i) => {
            let bDay = this.state.birthday;
            bDay.setDay(day);
          }}
        />
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={() => {this.validateForm();}}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={() => {
            this.props.navigation.pop()
        }}>
        <Text style={styles.loginText}>Back</Text>
      </TouchableOpacity>

      </View>
    )
  }
}


function mapStateToProps(state) {
  return {
    success: state.user.registeredSuccessfully,
    userProfileSuccess: false
  }
}
export default connect()(RegisterPart2)
