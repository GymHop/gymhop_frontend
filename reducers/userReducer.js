import {
  POST_USER_PENDING,
  POST_USER_SUCCESS,
  POST_USER_FAILURE,
  CLEAR_REGISTRATION_ERRORS,
  GET_USER_DETAILS_PENDING,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE,
  POST_USER_LOGIN_PENDING,
  POST_USER_LOGIN_SUCCESS,
  POST_USER_LOGIN_FAILURE,
  UPDATE_USER_DETAILS_PENDING,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE,
  LOG_OUT_USER,
  SET_USER_TOKEN,
  CREATE_SUBSCRIPTION_CHARGE_SUCCESS,
  CREATE_SUBSCRIPTION_CHARGE_FAILURE,
  CREATE_SUBSCRIPTION_CHARGE_PENDING,
} from '../actions/actiontypes';

export default function userReducer(state={
    token: null,
    pending: false,
    userDetailsPending: false,
    userDetailsUpdatePending: false,
    loginPending: false,
    error: false,
    userDetailsUpdateSuccess: null,
    details: {},
    registeredSuccessfully: null,
    errors: {},
    paymentSuccessful: false,
    paymentPending: false
}, action) {
  switch (action.type) {
    // post user == register
    case POST_USER_PENDING:
      return {...state, pending: true, error: false, registeredSuccessfully: null}
    case POST_USER_SUCCESS:
      //user successfully registers
      console.log("Post register payload below");
      console.log(action.payload)
      return {
        ...state,
        pending: false,
        token: action.payload.token,
        error: false,
        registeredSuccessfully:true
      }
    case POST_USER_FAILURE:
      return {
        ...state,
        pending: false,
        error: true, //just a flag
        errors: action.errors, // the actual errors
        registeredSuccessfully: false
      }
    case GET_USER_DETAILS_PENDING:
      return {
        ...state,
        userDetailsPending:true
      }
    case GET_USER_DETAILS_SUCCESS:
      console.log("got user details");
      return {
        ...state,
        userDetailsPending:false,
        details: action.payload

      }
    case GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        userDetailsPending:false
      }
    case POST_USER_LOGIN_PENDING:
      console.log("login pending");
      return {
        ...state,
        loginPending: true
      }
    case POST_USER_LOGIN_SUCCESS:
      console.log("post user login success");
      console.log(action.payload.token);
      return {
        ...state,
        loginPending: false,
        token: action.payload.token
      }
    case POST_USER_LOGIN_FAILURE:
      console.log("failure to login");
      return {
        ...state,
        loginPending: false
      }
    case LOG_OUT_USER:
      return {
        ...state,
        token: null
      }
    case SET_USER_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case UPDATE_USER_DETAILS_PENDING:
      return {
        ...state,
        userDetailsUpdateSuccess: null,
        userDetailsUpdatePending: true,
    }
    case UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        details: action.payload,
        userDetailsUpdateSuccess: true,
        userDetailsUpdatePending: false,
    }
    case UPDATE_USER_DETAILS_FAILURE:
      return {
        ...state,
        userDetailsUpdateSuccess: false,
        userDetailsUpdatePending: false,
    }
    case CLEAR_REGISTRATION_ERRORS:
      return {
        ...state,
        errors: {}
      }
    case CREATE_SUBSCRIPTION_CHARGE_PENDING:
      return {
        ...state,
        paymentPending: true
      }
    case CREATE_SUBSCRIPTION_CHARGE_SUCCESS:
      return {
        ...state,
        paymentSuccessful: true,
        paymentPending: false
      }
    case CREATE_SUBSCRIPTION_CHARGE_FAILURE:
      return {
        ...state,
        paymentSuccessful: false,
        paymentPending: false
      }
    default:
      // console.log("default case hit with " + action.type);
      return {
        ...state
      }
  }
}
export const getUserStatus = (userReducer) => {
  return userReducer.details.is_gym_owner
}
