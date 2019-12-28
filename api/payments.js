import axios from 'axios';
import {domain} from './api-config.js';

export function createCharge(apiToken, teir, stripeToken){
  return axios.post(
      domain + "/api/v1/payments/",
      {
        teir,
        stripeToken
      },
      {
        headers: {"Authorization": "Token " + apiToken}
      }
  )
}
