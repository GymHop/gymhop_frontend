import axios from 'axios';
import {domain} from './api-config.js';
// import _ from 'lodash';
// import store from '../store';
// import { URL, LOGIN } from '../config/Api';

export function InvalidCredentialsException(message) {
    this.message = message;
    this.name = 'InvalidCredentialsException';
}




export function attemptLogin(username, password) {
  return axios
    .post( domain+"/api/v1/auth/", {
      username,
      password
    }, {
      // headers: {'Access-Control-Allow-Origin': 'http://localhost:8000',
      //           'Access-Control-Allow-Credentials': 'true'
      // }
    })
    .then(function (response) {
      return response
    })
}
