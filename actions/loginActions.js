import {
  POST_USER_LOGIN_PENDING,
  POST_USER_LOGIN_SUCCESS,
  POST_USER_LOGIN_FAILURE
} from "./actiontypes";

import * as LoginAPI from "../api/login";

import { showMessage, hideMessage } from "react-native-flash-message";

export function attemptLoginPending() {
  return {
    type: POST_USER_LOGIN_PENDING
  }
}
export function attemptLoginSuccess(results) {
  return {
    type: POST_USER_LOGIN_SUCCESS,
    payload: results.data
  }
}
export function attemptLoginFailure() {
  return {
    type: POST_USER_LOGIN_FAILURE,
  }
}

export function attemptLogin(identifier, password) {
  return (dispatch) => {
    console.log("attempting login action");
    dispatch(attemptLoginPending());
    LoginAPI.attemptLogin(identifier, password).then((results) => {
      console.log("successful");
      dispatch(attemptLoginSuccess(results));
    }).catch((error) => {

      console.log("error loggin in");
        showMessage({
          message: "Incorrect User or Password",
          type: "info",
          backgroundColor: "#ea1010",
          flex: "1",
          justifyContent: "center",
          fontSize: "18"
      });
      dispatch(attemptLoginFailure())

    })

  }
}
