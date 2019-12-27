import * as mockMetricsActions from '../actions';
import middleware from '../middleware';
import types from '../constants';

jest.mock('../actions');

describe('metricsData', () => {
  describe('middleware', () => {
    it('should avoid wrong actions', () => {
      middleware({ type: 'test' });

      expect(mockMetricsActions.updateMetricsState).toHaveBeenCalledTimes(0);
    });

    it('should dispatch `updateMetricsState` and return same data if action data is empty', () => {
      const data = [];

      middleware({
        type: types.FETCH_METRICS_REQUEST_SUCCESS,
        data,
      });

      expect(mockMetricsActions.updateMetricsState).toHaveBeenCalledWith(data);
    });

    it('should dispatch `updateMetricsState` and return formatted data', () => {
      const data = [
        {
          sector: 'Revenue',
          suffix: '€',
          device: {
            smartphone: {
              value: 80000,
            },
            tablet: {
              value: 120000,
            },
          },
        },
      ];
      const expected = [
        {
          formattedTotal: '200.000€',
          sector: 'Revenue',
          total: 200000,
          device: {
            smartphone: {
              color: '#38690d',
              formattedPercentage: '40%',
              formattedValue: '80.000€',
              percentage: 40,
              value: 80000,
            },
            tablet: {
              color: '#88d13c',
              formattedPercentage: '60%',
              formattedValue: '120.000€',
              percentage: 60,
              value: 120000,
            },
          },
        },
      ];

      middleware({
        type: types.FETCH_METRICS_REQUEST_SUCCESS,
        data,
      });

      expect(mockMetricsActions.updateMetricsState).toHaveBeenCalledWith(
        expected
      );
    });
  });
});
