import mockStore from '@app/store';
import mockAppView from '@app/views/app';
import mockMetricsContainer from '@app/containers/metrics';
import * as mockMetricsActions from '@app/data/metrics/actions';
import appContainer from '..';

jest.mock('@app/store');
jest.mock('@app/views/app');
jest.mock('@app/containers/metrics');
jest.mock('@app/data/metrics/actions');

const buildInitState = state => ({
  chartsInfo: [{}],
  isAppReady: true,
  isRequesting: false,
  ...state,
});

describe('appContainer', () => {
  document.body.id = 'root';

  describe('container', () => {
    it('should render `appView`', () => {
      const state = buildInitState();

      appContainer(state);

      expect(mockAppView).toHaveBeenCalled();
    });

    it('should render `mockMetricsContainer` with current state', () => {
      const state = buildInitState();

      appContainer(state);

      expect(mockMetricsContainer).toHaveBeenCalledWith(state);
    });
  });

  describe('store', () => {
    it('should dispatch `fetchMetricsData`', () => {
      const state = buildInitState({ chartsInfo: [] });

      appContainer(state);

      expect(mockStore.dispatch).toHaveBeenCalled();
      expect(mockMetricsActions.fetchMetricsData).toHaveBeenCalled();
    });

    it('should subscribe the appContainer reducer', () => {
      expect(mockStore.subscribeReducer).toHaveBeenCalled();
    });

    it('should subscribe the appContainer view', () => {
      expect(mockStore.subscribe).toHaveBeenCalled();
    });
  });
});
