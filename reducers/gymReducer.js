import {
  GET_GYMS_PENDING,
  GET_GYMS_FAILURE,
  GET_GYMS_SUCCESS,
} from '../actions/actiontypes';

export default function gymReducer(state={
  gyms: [],
  pending: true,
  error: []
}, action) {
  switch (action.type) {
    case GET_GYMS_PENDING:
      return {...state, pending: true}
    case GET_GYMS_FAILURE:
      return {
        ...state,
        gyms: [],
        pending: false
      }
    case GET_GYMS_SUCCESS:
      return {
        ...state,
        gyms: action.payload,
        pending: false
      }
    default:
      return {...state}

  }
}
