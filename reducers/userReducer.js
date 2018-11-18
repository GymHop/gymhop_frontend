import {
  POST_USER_PENDING,
  POST_USER_SUCCESS,
  POST_USER_FAILURE,
  GET_USER_DETAILS_PENDING,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE,
  POST_USER_LOGIN_PENDING,
  POST_USER_LOGIN_SUCCESS,
  POST_USER_LOGIN_FAILURE
} from '../actions/actiontypes';

export default function userReducer(state={
    token: null,
    pending: false,
    userDetailsPending: false,
    loginPending: false,
    error: false,
    details: {}
}, action) {
  switch (action.type) {
    // post user == register
    case POST_USER_PENDING:
      return {...state, pending: true, error: false}
    case POST_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        token: action.payload.token.token,
        error: false
      }
    case POST_USER_FAILURE:
      return {
        ...state,
        pending: false,
        error: true
      }
    case GET_USER_DETAILS_PENDING:
      return {
        ...state,
        userDetailsPending:true
      }
    case GET_USER_DETAILS_SUCCESS:
      console.log("got user details");
      console.log(action.payload);
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
    default:
      // console.log("default case hit with " + action.type);
      return {
        ...state
      }
  }
}
