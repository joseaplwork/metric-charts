import types from './constants';

export function fetchMetricsData() {
  return {
    type: types.FETCH_METRICS_REQUEST,
  };
}

export function fetchMetricsDataSuccess(data) {
  return {
    type: types.FETCH_METRICS_REQUEST_SUCCESS,
    data,
  };
}

export function fetchMetricsDataError() {
  return {
    type: types.FETCH_METRICS_REQUEST_ERROR,
  };
}

export function updateMetricsState(data) {
  return {
    type: types.UPDATE_METRICS_STATE,
    data,
  };
}
