import {
  POST_CHECKIN_PENDING,
  POST_CHECKIN_FAILURE,
  POST_CHECKIN_SUCCESS
} from './actiontypes';

import * as CheckinAPI from '../api/checkin';

export function checkinUserPending() {
  return {
    type: POST_CHECKIN_PENDING
  }
}
export function checkinUserFailure() {
  return {
    type: POST_CHECKIN_FAILURE
  }
}
export function checkinUserSuccess(results) {
  return {
    type: POST_CHECKIN_SUCCESS,
    payload: results.data
  }
}

export function checkinUser(token, gymAndUserInfo) {
  return (dispatch) => {
    dispatch(checkinUserPending());
    CheckinAPI.checkin(token, gymAndUserInfo).then((results) => {
      dispatch(checkinUserSuccess(results))
    }).catch((error) => {
      console.log("error checking in a user");
      
      console.log(error.response);
      dispatch(checkinUserFailure());
    });
  }
}
