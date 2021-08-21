import axios from 'axios';
import {domain} from './api-config.js';


export function getGyms(token, coords={}) {
  var latLng = {
    lat: coords.latitude || "",
    lng: coords.longitude || ""
  }
  console.log(token);
  console.log(coords)
  return axios.get(domain+"/api/v1/gyms/",
            {
              params: latLng,
              headers: {"Authorization": "Token " + token}
            }
        ).then((response) => {
          return response
        })
}
