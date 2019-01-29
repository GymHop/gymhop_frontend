import axios from 'axios';
import {domain} from './api-config.js';


export function checkin(token, gymAndUserKey) {
  console.log("token used for checkin below");
  console.log(token);
  
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
