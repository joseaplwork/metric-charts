import mockApiRequest from '@app/utils/request';
import * as mockMetricsActions from '@app/data/metrics/actions';
import types from '@app/data/metrics/constants';

import apiMiddleware from '../api';

jest.mock('@app/utils/request');
jest.mock('@app/data/metrics/actions');

describe('api middleware', () => {
  const action = { type: 'test' };
  test('should not call api if called with the wrong action', () => {
    apiMiddleware(action);

    expect(mockMetricsActions.fetchMetricsDataSuccess).toHaveBeenCalledTimes(0);
    expect(mockMetricsActions.fetchMetricsDataError).toHaveBeenCalledTimes(0);
  });

  test('should call api if called with the correct action', async () => {
    apiMiddleware({ type: types.FETCH_METRICS_REQUEST });

    expect(mockApiRequest).toHaveBeenCalled();
  });

  test('should dispatch `fetchMetricsDataSuccess` action if request resolves', async () => {
    const data = [{ id: 0 }];
    const resolveApiRequest = mockApiRequest.mockResolvedValue(data);

    apiMiddleware({ type: types.FETCH_METRICS_REQUEST });

    await resolveApiRequest();

    expect(mockMetricsActions.fetchMetricsDataSuccess).toHaveBeenCalledWith(
      data
    );
  });

  test('should dispatch `fetchMetricsDataReject` action if request rejects', async () => {
    const rejectApiRequest = mockApiRequest.mockRejectedValue();

    apiMiddleware({ type: types.FETCH_METRICS_REQUEST });

    try {
      await rejectApiRequest();
    } catch (error) {
      expect(mockMetricsActions.fetchMetricsDataError).toHaveBeenCalled();
    }
  });
});
