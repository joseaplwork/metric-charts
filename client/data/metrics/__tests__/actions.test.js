import types from '@app/data/metrics/constants';
import {
  fetchMetricsData,
  fetchMetricsDataSuccess,
  fetchMetricsDataError,
  updateMetricsState,
} from '../actions';

describe('metricsData', () => {
  describe('actions', () => {
    it('should call `fetchMetricsData` and return an object with the right type', () => {
      const expected = { type: types.FETCH_METRICS_REQUEST };

      expect(fetchMetricsData()).toEqual(expected);
    });

    it('should call `fetchMetricsDataSuccess` and return an object with the right type', () => {
      const data = [{ key: 'value' }];
      const expected = { type: types.FETCH_METRICS_REQUEST_SUCCESS, data };

      expect(fetchMetricsDataSuccess(data)).toEqual(expected);
    });

    it('should call `fetchMetricsDataError` and return an object with the right type', () => {
      const data = [{ key: 'value' }];
      const expected = { type: types.FETCH_METRICS_REQUEST_ERROR };

      expect(fetchMetricsDataError(data)).toEqual(expected);
    });

    it('should call `updateMetricsState` and return an object with the right type', () => {
      const data = [{ key: 'value' }];
      const expected = { type: types.UPDATE_METRICS_STATE, data };

      expect(updateMetricsState(data)).toEqual(expected);
    });
  });
});
