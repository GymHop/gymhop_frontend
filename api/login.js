import axios from 'axios';
import {domain} from './api-config.js';

export function attemptLogin(username, password,){
  // // TODO:
  // check if the email or username is filled out and substitute
  console.log("pre posting login");
  return axios.post(domain + "/api/v1/api-token-auth/",
    {
      username: username,
      password: password,
    }
  )
}
