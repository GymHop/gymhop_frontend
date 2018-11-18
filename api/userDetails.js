import axios from 'axios';
import {domain} from './api-config.js';

function getUserDetails(token){
  axios.get(
      domain + "/api/v1/user_profiles",
      {
        "Authorization": "Token " + token
      }
  )
}
