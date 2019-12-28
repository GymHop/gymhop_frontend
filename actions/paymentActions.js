import {
  CREATE_SUBSCRIPTION_CHARGE_PENDING,
  CREATE_SUBSCRIPTION_CHARGE_FAILURE,
  CREATE_SUBSCRIPTION_CHARGE_SUCCESS,
} from './actiontypes'

import * as API from '../api/payments';

function createChargePending() {
  return {
    type: CREATE_SUBSCRIPTION_CHARGE_PENDING
  }
}
function createChargeFailure() {
  return {
    type: CREATE_SUBSCRIPTION_CHARGE_FAILURE
  }
}
function createChargeSuccess(results) {
  return {
    type: CREATE_SUBSCRIPTION_CHARGE_SUCCESS,
    payload: results.data
  }
}

export function createCharge(APItoken, teir, stripeToken) {
  return (dispatch) => {
    dispatch(createChargePending());
    API.createCharge(APItoken, teir, stripeToken).then((results) => {
      dispatch(createChargeSuccess(results));
    }).catch((err) => {
      console.log("error starting ");
      console.log(err.response);
      dispatch(createChargeFailure());
    })
  }
}
