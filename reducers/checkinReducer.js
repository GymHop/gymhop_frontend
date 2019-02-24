import {
  POST_CHECKIN_PENDING,
  POST_CHECKIN_FAILURE,
  POST_CHECKIN_SUCCESS
} from '../actions/actiontypes';

export default function gymReducer(state={
  pending: false,
  checkin: {},
  errors: {}
  }, action) {
  switch (action.type) {
    case POST_CHECKIN_PENDING:
      return {
        ...state, pending: true,
      }
    case POST_CHECKIN_FAILURE:
      return {
        ...state,
        checkin: {},
        errors: action.payload,
        pending: false
      }
    case POST_CHECKIN_SUCCESS:
      return {
        ...state,
        checkin: action.payload,
        errors: {},
        pending: false
      }
    default:
      return {...state}

  }
}
