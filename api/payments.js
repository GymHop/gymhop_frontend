import axios from 'axios';
import {domain} from './api-config.js';

export function createCharge(apiToken, tier, stripeToken){
  return axios.post(
      domain + "/api/v1/payments/",
      {
        tier,
        stripeToken
      },
      {
        headers: {"Authorization": "Token " + apiToken}
      }
  )
}
