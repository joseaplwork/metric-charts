import mockStore from '@app/store';
import mockMetricsView from '@app/views/metrics';
import metricsContainer from '..';

jest.mock('@app/store');
jest.mock('@app/views/metrics');
jest.mock('@app/data/metrics/actions');

describe('metricsContainer', () => {
  describe('container', () => {
    it('should render `metricsView`', () => {
      const state = { chartsInfo: [] };

      metricsContainer(state);

      expect(mockMetricsView).toHaveBeenCalledWith(state.chartsInfo);
    });
  });

  describe('store', () => {
    it('should subscribe the metricsContainer reducer', () => {
      expect(mockStore.subscribeReducer).toHaveBeenCalled();
    });
  });
});
