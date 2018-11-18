import axios from 'axios';
import {domain} from './api-config.js';

export function attemptLogin(username, password, email){
  // // TODO:
  // check if the email or username is filled out and substitute
  return axios.post(domain + "/api/v1/auth/",
    {
      username: username,
      password: password,
    }
  )
}
