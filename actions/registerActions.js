import {
  POST_USER_PENDING,
  POST_USER_SUCCESS,
  POST_USER_FAILURE,
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

      let profile_pic_data = {
        profile_pic: userData.profile_pic
      }

      var picture = userData.profile_pic;
        if (picture) {
          console.log('Test');
          delete userData.profile_pic;
        }
      let results = await RegisterAPI.attemptRegister(userData) // extras of variable length
      // results is going to have the token
      console.log(userData)

      // let profile_pic_data = {
      //   profile_pic: userData.profile_pic
      // }

      let token = results.data.token;
      dispatch(updateUserDetails(token, profile_pic_data))
      dispatch(registerUserSuccess(results));
    } catch (error) {
      console.log("Issue creating a User");
      console.log(error);
      // dispatch(registerUserFailure(error.response.data));
    }
  }
}
