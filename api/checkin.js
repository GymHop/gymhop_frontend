import axios from 'axios';
import {domain} from './api-config.js';


export function checkin(token, codeAndUserKey) {
  console.log("token used for checkin below");
  console.log(token);

  return axios.post(domain+"/api/v1/check_ins/",
            {
              user: codeAndUserKey.user,
              code: codeAndUserKey.code
            },
            {
              headers: {"Authorization": "Token " + token}
            }
        ).then((response) => {
          return response
        })
}
