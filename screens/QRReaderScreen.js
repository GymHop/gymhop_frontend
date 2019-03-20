import React from 'react';
import { ScrollView, StyleSheet, View, Text,
         LayoutAnimation, Dimensions, TouchableOpacity,
         Vibration, PermissionsAndroid } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import QRCodeScanner from 'react-native-qrcode-scanner';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ActionCreators from '../actions/checkinActions';

import { showMessage, hideMessage } from "react-native-flash-message";

class QRReaderScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);

    this.scanned = false;
    this.state = {
      hasCameraPermission: null,
      lastScanned: null,
      lastScanTime: null,
      lastScannedUrl: null
    }
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message:
          'To Scan QR Codes',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    } else {
      return false
    }
  } catch (err) {
    return false
    console.warn(err);
  }
}

  componentDidUpdate(prevProps, prevState) {
    if ((Object.keys(this.props.checkin).length > 0 || Object.keys(this.props.errors).length > 0) && this.scanned) {
      this.props.navigation.push("PostCheckIn", {resetScanned: () => {
        this.setState({lastScannedUrl:null, lastScanTime:null});
        this.scanner.reactivate();
      }});
      this.scanned = false;
      // pass back navigation works but then scanning again is blocked.
      // i believe it is because my passed resetScan fn is not being called even though it is explicitly called
    }
  }

  _requestCameraPermission = async () => {
    const { status } = await this.requestCameraPermission();
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
        let resetDateTime;
        resetDateTime = new Date(Date.now() - (1000*1800)); // 30 mins
      if (result.data !== this.state.lastScannedUrl || this.state.lastScanTime < resetDateTime) {
        LayoutAnimation.spring();
        Vibration.vibrate([100, 100, 100])
        showMessage({
          message: "Checked In!",
          type: "info",
          backgroundColor: "#00FF00",
          flex: "1",
          justifyContent: "center",
          fontSize: "18"
        });
        console.log("SCANNED!");
        console.log(result.data);

        var data = {
          code: result.data
        }
        console.log("sending below to server");
        this.props.Actions.checkinUser(this.props.token, data);
        this.scanned = true;
        }
        let lastScanTime;
        this.setState({ lastScannedUrl: result.data, lastScanTime: Date.now()}); // reset lastScannedUrl to allow for another scan

    }

  render() {
    return (
        <QRCodeScanner
                  onRead={this._handleBarCodeRead}
                  showMarker={true}
                  ref={(node) => { this.scanner = node }}
                  cameraProps={{captureAudio: false}}
          />
    );
  }
}
function mapStateToProps(state) {
  return {
    pending: state.checkin.pending,
    checkin: state.checkin.checkin,
    errors: state.checkin.errors,
    token: state.user.token

  }
}

function mapDispatchToProps(dispatch){
  return {
    Actions: bindActionCreators(ActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRReaderScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },

  //qr code reader default
  centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777',
    },
    textBold: {
      fontWeight: '500',
      color: '#000',
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
      padding: 16,
    },

});
