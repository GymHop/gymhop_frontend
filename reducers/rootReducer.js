import { combineReducers } from 'redux';
// import storage from 'redux-persist/lib/storage' // or whatever storage you are using


import gymReducer from './gymReducer';
import checkinReducer from './checkinReducer';
import userReducer from './userReducer';

const appReducer = combineReducers({
  gyms: gymReducer,
  checkin: checkinReducer,
  user: userReducer,
})

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;
