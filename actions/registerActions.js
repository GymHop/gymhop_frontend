import {
  POST_USER_PENDING,
  POST_USER_SUCCESS,
  POST_USER_FAILURE,
} from './actiontypes';

import * as RegisterAPI from '../api/register';

export function registerUserPending() {
  return {
    type: POST_USER_PENDING
  }
}
export function registerUserSuccess(results) {
  return {
    type: POST_USER_SUCCESS,
    payload: results.data
  }
}
export function registerUserFailure(e) {
  return {
    type: POST_USER_FAILURE,
    errors: e
  }
}

export function registerUser(userData){
  // expecting userData to be an object
  return (dispatch) => {
    dispatch(registerUserPending());
    RegisterAPI.attemptRegister(userData.username,
                                userData.password,
                                userData.email).then((results) => {
        dispatch(registerUserSuccess(results))
    }).catch((error) => {
      console.log("Issue creating a User");
      console.log(error.response.data);

      dispatch(registerUserFailure(
        error.response.data
      ));
    })

  }
}
