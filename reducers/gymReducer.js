import {
  GET_GYMS_PENDING,
  GET_GYMS_FAILURE,
  GET_GYMS_SUCCESS,
  UI_SELECT_GYM
} from '../actions/actiontypes';

export default function gymReducer(state={
  gyms: [],
  pending: true,
  error: [],
  selectedGym: {}
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
      if (action.payload.length) {
        return {
          ...state,
          gyms: action.payload,
          selectedGym: action.payload[0],
          pending: false
        }
      } else {
        return {
          ...state,
          gyms: [],
          pending: false
        }
      }
    case UI_SELECT_GYM:
      return {
        ...state,
        selectedGym: action.payload
      }
    default:
      return {...state}

  }
}
