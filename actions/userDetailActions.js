import {
  GET_USER_DETAILS_PENDING,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE,
  UPDATE_USER_DETAILS_PENDING,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE
} from './actiontypes';

import * as UserDetailsAPI from '../api/userDetails';

export function getUserDetailsPending() {
  return {
    type: GET_USER_DETAILS_PENDING
  }
}
export function getUserDetailsSuccess(results) {
  return {
    type: GET_USER_DETAILS_SUCCESS,
    payload: results.data
  }
}
export function getUserDetailsFailure() {
  return {
    type: GET_USER_DETAILS_FAILURE,
  }
}

export function getUserDetails(token) {
  return (dispatch) => {
    dispatch(getUserDetailsPending())
    console.log("getting user details pending");
    console.log(UserDetailsAPI);
    UserDetailsAPI.getUserDetails(token).then((results) => {
      dispatch(getUserDetailsSuccess(results));
    }).catch((error) => {
      console.log("error getting user details");
      console.log(error);
      console.log("error");
    })
  }
}

export function updateUserDetailsPending() {
  return {
    type: UPDATE_USER_DETAILS_PENDING
  }
}
export function updateUserDetailsSuccess(results) {
  return {
    type: UPDATE_USER_DETAILS_SUCCESS,
    payload: results.data
  }
}
export function updateUserDetailsFailure() {
  return {
    type: UPDATE_USER_DETAILS_FAILURE
  }
}

// updating the user profile
export function updateUserDetails(token, details) {
  return (dispatch) => {
    dispatch(updateUserDetailsPending());
    UserDetailsAPI.updateUserDetails(token, details).then((results) => {
      dispatch(updateUserDetailsSuccess(results));
    }).catch((err) => {
      console.log("error saving user details");
      dispatch(updateUserDetailsFailure())
    })
  }
}
