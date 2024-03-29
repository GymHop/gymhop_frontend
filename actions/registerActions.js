import {
  POST_USER_PENDING,
  POST_USER_SUCCESS,
  POST_USER_FAILURE,
  CLEAR_REGISTRATION_ERRORS
} from './actiontypes';

import { updateUserDetails } from './userDetailActions';

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
  return async (dispatch) => {
    dispatch(registerUserPending());
    try {
      let {profile_pic, ...rest} = userData

      let results = await RegisterAPI.attemptRegister(rest) // extras of variable length
      // results is going to have the token

      // let profile_pic_data = {
      //   profile_pic: userData.profile_pic
      // }

      let token = results.data.token;
      dispatch(updateUserDetails(token, {profile_pic}))
      console.log('Profile pic updated')
      dispatch(registerUserSuccess(results));
    } catch (error) {
      console.log("Issue creating a User");
      console.log(error);
      dispatch(registerUserFailure(error.response.data));
    }
  }
}


export function clearErrors() {
  return {
    type: CLEAR_REGISTRATION_ERRORS
  }
}
