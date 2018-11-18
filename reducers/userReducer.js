import {
  POST_USER_PENDING,
  POST_USER_SUCCESS,
  POST_USER_FAILURE,
  GET_USER_DETAILS_PENDING,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAILURE
} from '../actions/registerActions';

export default function userReducer(state={
    token: null,
    pending: false,
    userDetailsPending: false,
    error: false,
    details: {}
}, action) {
  switch (action.type) {
    case POST_USER_PENDING:
      return {...state, pending: true, error: false}
    case POST_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        token: action.payload.token,
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
    default:
      return {
        ...state
      }
  }
}
