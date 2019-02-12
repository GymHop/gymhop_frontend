import {
  LOG_OUT_USER,
  SET_USER_TOKEN
} from './actiontypes';

export function logout() {
  return {
    type: LOG_OUT_USER
  }
}
export function setToken(token) {
  return {
    type: SET_USER_TOKEN,
    token: token
  }
}
