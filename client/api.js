import store from '@app/store';
import apiRequest from '@app/utils/request';
import types from '@app/data/metrics/constants';
import {
  fetchMetricsDataSuccess,
  fetchMetricsDataError,
} from '@app/data/metrics/actions';

export default async function apiMiddleware(action) {
  if (action.type === types.FETCH_METRICS_REQUEST) {
    const server = 'http://localhost:3005/';

    try {
      const response = await apiRequest(server);

      store.dispatch(fetchMetricsDataSuccess(response));
    } catch (error) {
      // Webpack will remove the below `if` statement in production mode
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
      store.dispatch(fetchMetricsDataError());
    }
  }
}
