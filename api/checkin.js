import axios from 'axios';
import {domain} from './api-config.js';


export function checkin(token, gymAndUserKey) {
  return axios.post(domain+"/api/v1/check_ins/",
            {
              user: gymAndUserKey.user,
              gym: gymAndUserKey.gym
            },
            {
              headers: {"Authorization": "Token " + token}
            }
        ).then((response) => {
          return response
        })
}
