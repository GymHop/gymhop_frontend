import {
  GET_GYMS_PENDING,
  GET_GYMS_FAILURE,
  GET_GYMS_SUCCESS,
  UI_SELECT_GYM
} from './actiontypes';

import * as GymAPI from '../api/gym';

export function getGymPending() {
  return {
    type: GET_GYMS_PENDING
  }
}


export function getGymSuccess(results) {
  return {
    payload: results.data,
    type: GET_GYMS_SUCCESS
  }
}
export function getGymFailure(error) {
  return {
    type: GET_GYMS_FAILURE,
    payload: error
  }
}

export function getGyms(token, coords={}) {
  return (dispatch) => {
    dispatch(getGymPending());
    GymAPI.getGyms(token, coords).then((results) => {
      dispatch(getGymSuccess(results));
    }).catch((error) => {
      console.log("Error getting gyms");
      console.log(error.response);
      dispatch(getGymFailure(error))
    })
  }
}

// for the ui
export function selectGym(gym) {
  return {
    type: UI_SELECT_GYM,
    payload: gym
  }
}
