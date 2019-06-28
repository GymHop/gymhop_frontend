import React, { Component, PropTypes } from "react";
import {
  AsyncStorage,
  Modal,
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from "react-native";

import { withNavigation } from 'react-navigation';


import Colors from '../../constants/Colors';

class NewUserScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modalVisible: false
      };
    }

    componentDidMount() {
      //Comment this out to get it to stay on screen for testing
      AsyncStorage.getItem(this.props.pagekey, (err, result) => {
        if (err) {
        } else {
          if (result == null) {
            console.log("null value recieved", result);
            this.setModalVisible(true);
          } else {
            console.log("result", result);
          }
        }
      });
      AsyncStorage.setItem(this.props.pagekey, JSON.stringify({"value":"true"}), (err,result) => {
              console.log("error",err,"result",result);
              });
      // ---------------------------------------------------------

      // Comment this in to make sure it stays up while testing: 
      this.setModalVisible(true);
    }
    setModalVisible(visible) {
      this.setState({ modalVisible: visible });
    }
    _handleExit() {
      this.props.navigation.navigate('Main');
    }

      render() {
      return (
        <View>
          <Modal
            animationType={"slide"}
            transparent={true}
            style={styles.screenContainer}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <View style={styles.screenContainer}>
              <View style={styles.screenTitleContainer}>
                <Text style={styles.screenTitle}>{this.props.title}</Text>
              </View>
              <View style={styles.screenDescriptionContainer}>
                <Text style={styles.screenDescription} allowFontScaling={true}>
                  {this.props.description}
                </Text>
              </View>
              <View style={styles.screenExitContainer}>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    this._handleExit();

                  }}
                >
                  <View style={styles.screenExitButtonContainer}>
                    <Text style={styles.screenExitButtonText}>Exit</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    screenContainer:{
        backgroundColor: Colors.tintColor,
        flex:1,
        marginTop:70,
        marginBottom:40,
        marginLeft:20,
        marginRight:20,
        borderRadius:20,
        borderWidth:4,
        borderColor:'white'
      },
      screenTitle:{
        color:'white',
            fontWeight:'bold',
        fontSize:20,
        textAlign:'center',
        margin:10,	
      },
      screenDescription:{
        color:'white',
            fontSize:15,
        marginRight:20,
        marginLeft:20
      },
      screenCloseIcon:{
        alignSelf:'flex-end',
        flex:0.5,
        marginRight:10
      },
      screenTitleContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
      },
      screenDescriptionContainer:{
        flex:6.5
      },
      screenExitContainer:{
        flex:2,
        justifyContent:'flex-start',
        alignItems:'center',
      },
      screenExitButtonContainer:{
        width:200,
        height:40,
        backgroundColor:'grey',
        borderRadius:10,
        justifyContent:'center',
      },
      screenExitButtonText:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
      }
    });

export default withNavigation(NewUserScreen)