import { AppRegistry } from 'react-native';
global.PaymentRequest = require('react-native-payments').PaymentRequest;
import App from './App';
AppRegistry.registerComponent('gymhop_frontend', () => App);
