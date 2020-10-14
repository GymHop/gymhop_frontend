import React from 'react';

import { View, Text, Image, Platform, Keyboard, TouchableWithoutFeedback,
  TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import PhotoUploadForm from '../../components/registration/PhotoUploadForm';
import * as ActionCreators from '../../actions/registerActions';
import { styles } from '../../styles/registration';
import { showMessage, hideMessage } from "react-native-flash-message";

class RegisterPart extends React.Component {
    static navigationOptions = {
        header: null,
      };
    
      constructor(props){
        super(props);
        this.state = {
            profile_pic: null,//user profile fields here
            first_name: null, // server side _ casing b/c its just faster to put together
            last_name: null,
        }
        this.moveOn = this.moveOn.bind(this);
    }

    moveOn() {
        const baseUser = this.props.navigation.getParam('baseUser', {});

        this.props.navigation.push("PopulateUserProfile", {
            baseUser,
            baseIdentity: {
                profile_pic: this.state.profile_pic,
                first_name: this.state.first_name,
                last_name: this.state.last_name
            }
          });
    }
      
      render () {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios'?'padding':null} enabled>
                    <View style={styles.textStyle}>
                        <Text style={styles.photoText}>Click to add a profile picture!</Text>
                    </View>
                    <View style={styles.photoUploadContainer}>
                        <PhotoUploadForm
                        profile_pic={this.state.profile_pic}
                        onPhotoSelected={(pic)=>this.setState({profile_pic: pic})}/>
                    </View>
                    <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: '10%'}}>
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
                        <TouchableOpacity style={styles.registerButton} onPress={() => this.moveOn()}>
                            <Text style={styles.registerText}>Next</Text>
                            </TouchableOpacity>
                        <TouchableOpacity style={styles.loginButton} onPress={() => {
                                this.props.navigation.pop()
                            }}>
                            <Text style={styles.loginText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback> 
            )
        }
}

export default connect()(RegisterPart)