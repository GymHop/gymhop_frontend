import axios from 'axios';
import {domain} from './api-config.js';

export function getUserDetails(token){
  console.log("getting user details with "+ token);
  return axios.get(
      domain + "/api/v1/user_profiles/",
      {
        headers: {"Authorization": "Token " + token}
      }
  )
}

export function updateUserDetails(token, details) {
  return axios.patch(
      domain + "/api/v1/user_profiles/",
      details,
      {
        headers: {"Authorization": "Token " + token}
      }
  )
}
