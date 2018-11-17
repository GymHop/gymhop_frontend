import axios from 'axios';
import {domain} from './api-config.js';


export function getGyms(token) {
  return axios.get(domain+"/api/v1/gyms/",
            {
              headers: {"Authorization": "Token " + token}
            }
        ).then((response) => {
          return response
        })
}
