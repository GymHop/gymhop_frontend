import {
GET_GYM_STATISTICS_PENDING,
GET_GYM_STATISTICS_SUCCESS,
GET_GYM_STATISTICS_FAILURE
} from '../actions/actiontypes';

export default function gymOwnerReducer(state={
                                                stats: {
                                                  check_ins: []
                                                },
                                                pending: null,
                                              }, action) {

      switch (action.type) {
        case GET_GYM_STATISTICS_PENDING:
          return {
            ...state,
            pending: true
          }
        case GET_GYM_STATISTICS_SUCCESS:
          return {
            ...state,
            pending: false,
            stats: action.payload
          }
        case GET_GYM_STATISTICS_FAILURE:
          return {
            ...state,
            pending: false
          }
        default:
          return {...state}
      }
}
