import {
  GET_GYM_STATISTICS_PENDING,
  GET_GYM_STATISTICS_SUCCESS,
  GET_GYM_STATISTICS_FAILURE} from '../actiontypes';

import * as StatsAPI from '../../api/stats';


export function getStatisticsPending() {
  return {
    type: GET_GYM_STATISTICS_PENDING
  }
}
export function getStatisticsSuccess(results) {
  return {
    type: GET_GYM_STATISTICS_SUCCESS,
    payload: results.data
  }
}
export function getStatisticsFailure() {
  return {
    type: GET_GYM_STATISTICS_FAILURE
  }
}

export function getStatistics(token) {
  return async (dispatch) => {
    dispatch(getStatisticsPending());
    try {
      let results = await StatsAPI.getGymOwnerStats(token);
      dispatch(getStatisticsSuccess(results));
    } catch (e) {
      console.log("error getting stats for a gym owner");
      console.log(e);
      dispatch(getStatisticsFailure())
    }
  }
}
