import axios from 'axios';
import {domain} from './api-config.js';

export function getGymOwnerStats(token){
  return axios.get(
      domain + "/api/v1/gym_owner_statistics/",
      {
        headers: {"Authorization": "Token " + token}
      }
  )
}
