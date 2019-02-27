import React from 'react';
import { ScrollView, StyleSheet, View, Text, LayoutAnimation, Dimensions, Vibration, PermissionsAndroid } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ActionCreators from '../actions/checkinActions';

import { showMessage, hideMessage } from "react-native-flash-message";

class QRReaderScreen extends React.Component {
  static navigationOptions = {
    title: 'QR Reader',
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
          'To Scan QR Codes ',
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
    console.log("post Checkin");
    console.log(this.props);
    if ((Object.keys(this.props.checkin).length > 0 || Object.keys(this.props.errors).length > 0) && this.scanned) {
      this.props.navigation.push("PostCheckIn", {resetScanned: () => {this.setState({lastScannedUrl:null, lastScanTime:null})}});
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
        let split = result.data.split("_")
        var data = {
          gym: split[0]
        }
        console.log("sending below to server");
        console.log(data);
        this.props.Actions.checkinUser(this.props.token, data);
        this.scanned = true;
        }
        let lastScanTime;
        this.setState({ lastScannedUrl: result.data, lastScanTime: Date.now()}); // reset lastScannedUrl to allow for another scan

    }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : null}
      </View>
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
});
