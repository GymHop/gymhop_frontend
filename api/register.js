import axios from 'axios';
import {domain} from './api-config.js';

export function attemptRegister(userData){
  return axios.post(domain + "/api/v1/register/",
    userData
  )
}
