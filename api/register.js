import axios from 'axios';
import {domain} from './api-config.js';

export function attemptRegister(username, password, email){
  return axios.post(domain + "/api/v1/register/",
    {
      username: username,
      password: password,
      email: email
    }
  )
}
