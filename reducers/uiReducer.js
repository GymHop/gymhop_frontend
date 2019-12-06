import {
  PULLUP_MENU_LEVEL
} from '../actions/actiontypes';

export default function userReducer(state={
    pullUpLevel: 0
}, action) {
  switch (action.type) {
    case PULLUP_MENU_LEVEL:
      return {
        ...state,
        pullUpLevel: action.payload
      }
      break;
    default:
      return {...state}
  }
}
